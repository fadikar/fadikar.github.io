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

  function isImageFile(path) {
    return /\.(png|jpe?g|webp|gif|svg)$/i.test(path || "");
  }

  function normalizeFolder(folder) {
    return (folder || "").replace(/\/$/, "");
  }

  function resolveFolderForTripPage(folder) {
    var normalized = normalizeFolder(folder);
    if (!normalized) {
      return "";
    }
    if (/^https?:\/\//i.test(normalized) || normalized.startsWith("/")) {
      return normalized;
    }
    return new URL("../" + normalized + "/", window.location.href).toString().replace(/\/$/, "");
  }

  async function listFromDirectoryIndex(folder) {
    var target = resolveFolderForTripPage(folder);
    if (!target) {
      return [];
    }
    var response = await fetch(target + "/");
    if (!response.ok) {
      return [];
    }
    var html = await response.text();
    var matches = Array.from(html.matchAll(/href=["']([^"']+)["']/gi));
    return Array.from(new Set(matches
      .map(function (m) { return m[1]; })
      .filter(function (href) { return !href.startsWith("?") && !href.startsWith("#") && isImageFile(href); })
      .map(function (href) {
        if (href.startsWith("http")) {
          return href;
        }
        return target + "/" + href.replace(/^\.\//, "").replace(/^\//, "");
      })));
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
      .filter(function (item) { return item && item.type === "file" && isImageFile(item.name); })
      .map(function (item) { return item.download_url; });
  }

  async function listFromConventionalNames(folder) {
    var target = resolveFolderForTripPage(folder);
    if (!target) {
      return [];
    }

    var candidates = [
      "cover.jpg", "cover.jpeg", "cover.png", "cover.webp",
      "cover2.jpg", "cover2.jpeg", "cover2.png", "cover2.webp",
      "cover3.jpg", "cover3.jpeg", "cover3.png", "cover3.webp",
      "cover4.jpg", "cover4.jpeg", "cover4.png", "cover4.webp",
      "cover5.jpg", "cover5.jpeg", "cover5.png", "cover5.webp"
    ];

    var checks = await Promise.all(
      candidates.map(async function (name) {
        var url = target + "/" + name;
        try {
          var res = await fetch(url, { method: "HEAD" });
          return res.ok ? url : null;
        } catch (e) {
          return null;
        }
      })
    );

    return checks.filter(Boolean);
  }

  async function resolveTripImages(trip, githubConfig) {
    if (Array.isArray(trip.images) && trip.images.length > 0) {
      return trip.images.filter(isImageFile);
    }

    var folder = normalizeFolder(trip.image_folder);
    if (!folder) {
      return [];
    }

    var local = await listFromDirectoryIndex(folder);
    if (local.length > 0) {
      return local.sort(function (a, b) { return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }); });
    }

    var remote = await listFromGitHubApi(folder, githubConfig);
    if (remote.length > 0) {
      return remote.sort(function (a, b) { return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }); });
    }

    var guessed = await listFromConventionalNames(folder);
    return guessed.sort(function (a, b) { return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }); });
  }

  function getSlug() {
    var bodySlug = document.body.getAttribute("data-trip-slug");
    if (bodySlug) {
      return bodySlug;
    }

    var params = new URLSearchParams(window.location.search);
    return params.get("slug");
  }

  function renderGallery(images) {
    var main = document.getElementById("trip-main-image");
    var thumbs = document.getElementById("trip-image-grid");

    if (!main || !thumbs) {
      return;
    }

    if (!images.length) {
      main.innerHTML = '<div class="card"><div class="card-body text-muted">No images found for this trip yet.</div></div>';
      thumbs.innerHTML = "";
      return;
    }

    main.innerHTML = '<img src="' + images[0] + '" alt="Trip highlight" class="img-fluid trip-detail-main-image w-100">';
    thumbs.innerHTML = images.slice(1).map(function (src, idx) {
      return (
        '<div class="col-6 col-lg-4">' +
          '<img src="' + src + '" alt="Trip photo ' + (idx + 2) + '" class="img-fluid trip-detail-side-image w-100">' +
        '</div>'
      );
    }).join("");
  }

  function ensureLightbox() {
    var existing = document.getElementById("trip-lightbox");
    if (existing) {
      return existing;
    }

    var node = document.createElement("div");
    node.id = "trip-lightbox";
    node.className = "trip-lightbox";
    node.innerHTML =
      '<button type="button" class="trip-lightbox-nav trip-lightbox-prev" aria-label="Previous photo">&#8249;</button>' +
      '<button type="button" class="trip-lightbox-nav trip-lightbox-next" aria-label="Next photo">&#8250;</button>' +
      '<button type="button" class="trip-lightbox-close" aria-label="Close image viewer">&times;</button>' +
      '<img class="trip-lightbox-image" alt="Expanded trip photo">' +
      '<div class="trip-lightbox-dots" aria-label="Photo position"></div>';
    document.body.appendChild(node);
    return node;
  }

  function closeLightbox(lightbox) {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("trip-lightbox-open");
  }

  function bindLightbox(images) {
    if (!images || images.length === 0) {
      return;
    }

    var lightbox = ensureLightbox();
    var closeBtn = lightbox.querySelector(".trip-lightbox-close");
    var prevBtn = lightbox.querySelector(".trip-lightbox-prev");
    var nextBtn = lightbox.querySelector(".trip-lightbox-next");
    var lightboxImage = lightbox.querySelector(".trip-lightbox-image");
    var dotsWrap = lightbox.querySelector(".trip-lightbox-dots");
    var currentIndex = 0;

    function renderDots() {
      if (!dotsWrap) {
        return;
      }
      dotsWrap.innerHTML = images.map(function (_, idx) {
        var cls = idx === currentIndex ? "trip-lightbox-dot active" : "trip-lightbox-dot";
        return '<button type="button" class="' + cls + '" data-index="' + idx + '" aria-label="Go to photo ' + (idx + 1) + '"></button>';
      }).join("");

      dotsWrap.querySelectorAll(".trip-lightbox-dot").forEach(function (dot) {
        dot.addEventListener("click", function (event) {
          event.stopPropagation();
          var idx = parseInt(dot.getAttribute("data-index") || "0", 10);
          renderAt(idx);
        });
      });
    }

    function renderAt(index) {
      if (!images.length) {
        return;
      }
      var normalized = ((index % images.length) + images.length) % images.length;
      currentIndex = normalized;
      lightboxImage.src = images[currentIndex];
      lightboxImage.alt = "Expanded trip photo " + (currentIndex + 1);
      renderDots();
    }

    function openFor(index) {
      renderAt(index);
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("trip-lightbox-open");
    }

    var galleryImages = Array.prototype.slice.call(
      document.querySelectorAll(".trip-detail-main-image, .trip-detail-side-image")
    );

    galleryImages.forEach(function (img, index) {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", function () {
        openFor(index);
      });
    });

    closeBtn.addEventListener("click", function () {
      closeLightbox(lightbox);
    });

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox(lightbox);
      }
    });

    prevBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      renderAt(currentIndex - 1);
    });

    nextBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      renderAt(currentIndex + 1);
    });

    document.addEventListener("keydown", function (event) {
      if (!lightbox.classList.contains("open")) {
        return;
      }
      if (event.key === "Escape") {
        closeLightbox(lightbox);
      } else if (event.key === "ArrowLeft") {
        renderAt(currentIndex - 1);
      } else if (event.key === "ArrowRight") {
        renderAt(currentIndex + 1);
      }
    });
  }

  function renderMeta(trip) {
    var title = document.getElementById("trip-title");
    var meta = document.getElementById("trip-meta");
    var summary = document.getElementById("trip-summary");

    if (title) {
      title.textContent = trip.title || "Trip";
    }

    if (meta) {
      var d = parseDate(trip.date);
      var endD = parseDate(trip.end_date);
      var dateLabel = trip.display_date || formatDateRange(d, endD);
      meta.textContent = [trip.location || "", dateLabel].filter(Boolean).join(" • ");
    }

    if (summary) {
      summary.textContent = trip.summary || "Add trip notes here.";
    }
  }

  async function initTripDetail() {
    var slug = getSlug();
    if (!slug) {
      return;
    }

    try {
      var dataUrl = new URL("../data/trips.json?v=20260215b", window.location.href);
      var response = await fetch(dataUrl.toString());
      if (!response.ok) {
        throw new Error("Unable to load trips data");
      }
      var payload = await response.json();
      var trips = Array.isArray(payload) ? payload : payload.trips;
      var githubConfig = payload && payload.github ? payload.github : null;
      if (!Array.isArray(trips)) {
        throw new Error("Invalid trips format");
      }

      var trip = trips.find(function (item) {
        return item && item.slug === slug;
      });

      if (!trip) {
        throw new Error("Trip not found");
      }

      renderMeta(trip);
      var images = await resolveTripImages(trip, githubConfig);
      renderGallery(images);
      bindLightbox(images);
    } catch (err) {
      var main = document.getElementById("trip-main-image");
      if (main) {
        main.innerHTML = '<div class="card"><div class="card-body text-danger">Unable to load this trip right now.</div></div>';
      }
    }
  }

  document.addEventListener("DOMContentLoaded", initTripDetail);
})();
