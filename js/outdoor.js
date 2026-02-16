(function () {
  "use strict";

  function parseDate(value) {
    var d = new Date(value + "T00:00:00");
    return Number.isNaN(d.getTime()) ? null : d;
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    }).format(date);
  }

  function formatDateRange(startDate, endDate) {
    if (!startDate) {
      return "";
    }
    if (!endDate || endDate.getTime() < startDate.getTime()) {
      return formatDate(startDate);
    }
    if (
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth()
    ) {
      var month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(startDate);
      return month + " " + startDate.getDate() + "-" + endDate.getDate() + ", " + startDate.getFullYear();
    }
    return formatDate(startDate) + " - " + formatDate(endDate);
  }

  function byNewest(a, b) {
    var ad = parseDate(a.date);
    var bd = parseDate(b.date);
    return (bd ? bd.getTime() : 0) - (ad ? ad.getTime() : 0);
  }

  function isImageFile(path) {
    return /\.(png|jpe?g|webp|gif|svg)$/i.test(path || "");
  }

  function normalizeFolder(folder) {
    return (folder || "").replace(/\/$/, "");
  }

  async function listFromDirectoryIndex(folder) {
    var target = normalizeFolder(folder);
    if (!target) {
      return [];
    }

    var response = await fetch(target + "/");
    if (!response.ok) {
      return [];
    }

    var html = await response.text();
    var matches = Array.from(html.matchAll(/href=["']([^"']+)["']/gi));
    var files = matches
      .map(function (m) { return m[1]; })
      .filter(function (href) {
        return !href.startsWith("?") && !href.startsWith("#") && isImageFile(href);
      })
      .map(function (href) {
        if (href.startsWith("http")) {
          return href;
        }
        return target + "/" + href.replace(/^\.\//, "").replace(/^\//, "");
      });

    return Array.from(new Set(files));
  }

  async function listFromGitHubApi(folder, githubConfig) {
    if (!githubConfig || !githubConfig.owner || !githubConfig.repo || !folder) {
      return [];
    }

    var apiUrl =
      "https://api.github.com/repos/" +
      encodeURIComponent(githubConfig.owner) +
      "/" +
      encodeURIComponent(githubConfig.repo) +
      "/contents/" +
      folder +
      (githubConfig.branch ? ("?ref=" + encodeURIComponent(githubConfig.branch)) : "");

    var response = await fetch(apiUrl);
    if (!response.ok) {
      return [];
    }

    var payload = await response.json();
    if (!Array.isArray(payload)) {
      return [];
    }

    return payload
      .filter(function (item) {
        return item && item.type === "file" && isImageFile(item.name);
      })
      .map(function (item) {
        return item.download_url;
      });
  }

  function sortImages(images) {
    return images.slice().sort(function (a, b) {
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
    });
  }

  async function resolveTripImages(trip, githubConfig) {
    if (Array.isArray(trip.cover_images) && trip.cover_images.length > 0) {
      return sortImages(trip.cover_images.filter(isImageFile));
    }

    var folder = normalizeFolder(trip.image_folder);
    if (!folder) {
      return [];
    }

    var fromDir = await listFromDirectoryIndex(folder);
    if (fromDir.length > 0) {
      return sortImages(fromDir);
    }

    var fromApi = await listFromGitHubApi(folder, githubConfig);
    return sortImages(fromApi);
  }

  function buildTags(tags) {
    if (!Array.isArray(tags) || tags.length === 0) {
      return "";
    }

    return (
      '<div class="trip-tags">' +
      tags.map(function (tag) {
        return '<span class="badge text-bg-secondary me-1 mb-1">' + tag + "</span>";
      }).join("") +
      "</div>"
    );
  }

  function buildImageStack(images) {
    if (!Array.isArray(images) || images.length === 0) {
      return '<div class="trip-card-image-wrap"></div>';
    }

    var slides = images.slice(0, 5).map(function (src, idx) {
      var activeClass = idx === 0 ? " active" : "";
      return '<img src="' + src + '" alt="Trip photo" class="trip-card-image' + activeClass + '">';
    }).join("");

    return '<div class="trip-card-image-wrap" data-rotate="true">' + slides + "</div>";
  }

  function renderTripCard(trip) {
    var tripDate = parseDate(trip.date);
    var tripEndDate = parseDate(trip.end_date);
    var dateLabel = trip.display_date || formatDateRange(tripDate, tripEndDate);
    var destination = trip.page || "#";

    return (
      '<div class="col-12 col-md-6 col-xl-4">' +
        '<a class="trip-card-link" href="' + destination + '">' +
          '<article class="card trip-card h-100 shadow-sm">' +
            buildImageStack(trip._resolved_images || []) +
            '<div class="card-body">' +
              '<h3 class="trip-card-title h5 mb-2">' + (trip.title || "Untitled Trip") + "</h3>" +
              '<p class="trip-card-meta mb-2">' + (trip.location || "") + "</p>" +
              '<p class="trip-card-meta mb-2">' + dateLabel + "</p>" +
              '<p class="trip-card-summary mb-2">' + (trip.summary || "") + "</p>" +
              buildTags(trip.tags) +
            "</div>" +
          "</article>" +
        "</a>" +
      "</div>"
    );
  }

  function groupByYear(trips) {
    var grouped = {};
    trips.forEach(function (trip) {
      var tripDate = parseDate(trip.date);
      var year = trip.year || (tripDate ? tripDate.getFullYear() : "Unknown");
      var key = String(year);
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(trip);
    });
    return grouped;
  }

  function renderTripsByYear(trips) {
    if (!Array.isArray(trips) || trips.length === 0) {
      return '<div class="text-muted">No explorations added yet.</div>';
    }

    var grouped = groupByYear(trips);
    var years = Object.keys(grouped).sort(function (a, b) { return parseInt(b, 10) - parseInt(a, 10); });

    return '<div class="accordion" id="trips-year-accordion">' + years.map(function (year, idx) {
      var collapseId = "trip-year-" + year + "-" + idx;
      var headingId = "trip-year-heading-" + year + "-" + idx;
      var isFirst = idx === 0;
      var cards = grouped[year].sort(byNewest).map(renderTripCard).join("");

      return (
        '<div class="accordion-item">' +
          '<h2 class="accordion-header" id="' + headingId + '">' +
            '<button class="accordion-button' + (isFirst ? "" : " collapsed") + '" type="button" data-bs-toggle="collapse" data-bs-target="#' + collapseId + '" aria-expanded="' + (isFirst ? "true" : "false") + '" aria-controls="' + collapseId + '">' +
              year + ' <span class="badge text-bg-secondary ms-2">' + grouped[year].length + "</span>" +
            "</button>" +
          "</h2>" +
          '<div id="' + collapseId + '" class="accordion-collapse collapse' + (isFirst ? " show" : "") + '" aria-labelledby="' + headingId + '" data-bs-parent="#trips-year-accordion">' +
            '<div class="accordion-body"><div class="row g-4">' + cards + "</div></div>" +
          "</div>" +
        "</div>"
      );
    }).join("") + "</div>";
  }

  function startCardSlides(container) {
    var wrappers = container.querySelectorAll(".trip-card-image-wrap[data-rotate='true']");
    wrappers.forEach(function (wrap) {
      var imgs = wrap.querySelectorAll(".trip-card-image");
      if (imgs.length <= 1) {
        return;
      }
      var idx = 0;
      window.setInterval(function () {
        imgs[idx].classList.remove("active");
        idx = (idx + 1) % imgs.length;
        imgs[idx].classList.add("active");
      }, 2800);
    });
  }

  async function initOutdoorList() {
    var container = document.getElementById("explorations-list");
    if (!container) {
      return;
    }

    var source = container.dataset.source || "data/trips.json";

    try {
      var response = await fetch(source);
      if (!response.ok) {
        throw new Error("Failed to load trips");
      }

      var payload = await response.json();
      var trips = Array.isArray(payload) ? payload : payload.trips;
      var githubConfig = payload && payload.github ? payload.github : null;

      if (!Array.isArray(trips)) {
        throw new Error("Trips data is invalid");
      }

      var resolvedTrips = await Promise.all(
        trips.map(async function (trip) {
          var images = await resolveTripImages(trip, githubConfig);
          trip._resolved_images = images;
          return trip;
        })
      );

      resolvedTrips.sort(byNewest);
      container.innerHTML = renderTripsByYear(resolvedTrips);
      startCardSlides(container);
    } catch (e) {
      container.innerHTML = '<div class="text-danger">Unable to load explorations right now.</div>';
    }
  }

  document.addEventListener("DOMContentLoaded", initOutdoorList);
})();
