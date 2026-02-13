(function () {
    "use strict";

    function parseTalkDate(value) {
        var date = new Date(value + "T00:00:00");
        return Number.isNaN(date.getTime()) ? null : date;
    }

    function formatDisplayDate(date) {
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        }).format(date);
    }

    function isPdfLink(url) {
        return /\.pdf($|\?)/i.test(url);
    }

    function normalizeSlides(talk) {
        if (Array.isArray(talk.slides) && talk.slides.length > 0) {
            return talk.slides;
        }

        if (typeof talk.slides_url === "string" && talk.slides_url.trim() !== "") {
            return [{ label: "Slides", url: talk.slides_url }];
        }

        if (typeof talk.slides_pdf === "string" && talk.slides_pdf.trim() !== "") {
            return [{ label: "Slides (PDF)", url: talk.slides_pdf }];
        }

        return [];
    }

    function renderSlideLinks(talk) {
        var slides = normalizeSlides(talk);
        if (slides.length === 0) {
            return "";
        }

        var links = slides
            .filter(function (slide) {
                return slide && typeof slide.url === "string" && slide.url.trim() !== "";
            })
            .map(function (slide) {
                var label = slide.label || "Slides";
                var pdf = isPdfLink(slide.url);
                var icon = pdf ? "bi-file-earmark-pdf" : "bi-box-arrow-up-right";
                return (
                    '<a href="' + slide.url + '" class="btn btn-outline-secondary btn-sm me-2 mb-2" target="_blank" rel="noopener noreferrer">' +
                        '<i class="bi ' + icon + ' me-1"></i>' + label +
                    "</a>"
                );
            })
            .join("");

        return links ? '<div class="mt-2 talk-links text-end">' + links + "</div>" : "";
    }

    function renderTalkItem(talk, nowDate) {
        var parsedDate = parseTalkDate(talk.date);
        if (!parsedDate) {
            return "";
        }

        var isUpcoming = parsedDate >= nowDate;
        var badgeClass = isUpcoming ? "text-bg-success" : "text-bg-secondary";
        var dateLabel = formatDisplayDate(parsedDate);
        var badgeLabel = isUpcoming ? ("Upcoming \u00b7 " + dateLabel) : dateLabel;
        var metaParts = [];
        if (talk.location) {
            metaParts.push(talk.location);
        }
        if (talk.talk_type) {
            metaParts.push(talk.talk_type);
        }
        var metaLine = metaParts.length > 0
            ? '<small class="text-muted">' + metaParts.join(" \u00b7 ") + "</small>"
            : "";

        return (
            '<div class="list-group-item px-0">' +
                '<div class="d-flex flex-wrap justify-content-between align-items-start gap-2">' +
                    "<div>" +
                        '<h6 class="mb-1">' + (talk.title || "Untitled Talk") + "</h6>" +
                        '<p class="mb-1 text-muted">' + (talk.venue || "") + "</p>" +
                        metaLine +
                    "</div>" +
                    '<div class="text-end">' +
                        '<span class="badge ' + badgeClass + '">' + badgeLabel + "</span>" +
                        renderSlideLinks(talk) +
                    "</div>" +
                "</div>" +
            "</div>"
        );
    }

    function groupTalksByYear(talks) {
        var grouped = {};
        talks.forEach(function (talk) {
            var parsedDate = parseTalkDate(talk.date);
            if (!parsedDate) {
                return;
            }
            var year = String(parsedDate.getFullYear());
            if (!grouped[year]) {
                grouped[year] = [];
            }
            grouped[year].push(talk);
        });

        return grouped;
    }

    function renderYearAccordion(talks, nowDate) {
        var grouped = groupTalksByYear(talks);
        var years = Object.keys(grouped).sort(function (a, b) {
            return parseInt(b, 10) - parseInt(a, 10);
        });

        if (years.length === 0) {
            return '<div class="text-muted">No talks available yet.</div>';
        }

        var items = years.map(function (year, index) {
            var collapseId = "talk-year-" + year + "-" + index;
            var headingId = "talk-year-heading-" + year + "-" + index;
            var isFirst = index === 0;
            var talksMarkup = grouped[year]
                .map(function (talk) {
                    return renderTalkItem(talk, nowDate);
                })
                .join("");

            return (
                '<div class="accordion-item">' +
                    '<h2 class="accordion-header" id="' + headingId + '">' +
                        '<button class="accordion-button' + (isFirst ? "" : " collapsed") + '" type="button" data-bs-toggle="collapse" data-bs-target="#' + collapseId + '" aria-expanded="' + (isFirst ? "true" : "false") + '" aria-controls="' + collapseId + '">' +
                            year + ' <span class="badge text-bg-secondary ms-2">' + grouped[year].length + "</span>" +
                        "</button>" +
                    "</h2>" +
                    '<div id="' + collapseId + '" class="accordion-collapse collapse' + (isFirst ? " show" : "") + '" aria-labelledby="' + headingId + '" data-bs-parent="#talks-year-accordion">' +
                        '<div class="accordion-body">' +
                            '<div class="list-group list-group-flush">' + talksMarkup + "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>"
            );
        }).join("");

        return '<div class="accordion" id="talks-year-accordion">' + items + "</div>";
    }

    async function loadTalks(source) {
        var response = await fetch(source);
        if (!response.ok) {
            throw new Error("Unable to load talks data");
        }

        var payload = await response.json();
        var talks = Array.isArray(payload) ? payload : payload.talks;
        if (!Array.isArray(talks)) {
            throw new Error("Talks data is not an array");
        }
        return talks;
    }

    async function initTalksList(container) {
        var source = container.dataset.source || "data/talks.json";
        var limit = parseInt(container.dataset.limit || "0", 10);
        var nowDate = new Date();
        nowDate.setHours(0, 0, 0, 0);

        try {
            var talks = await loadTalks(source);
            talks.sort(function (a, b) {
                var dateA = parseTalkDate(a.date);
                var dateB = parseTalkDate(b.date);
                var timeA = dateA ? dateA.getTime() : 0;
                var timeB = dateB ? dateB.getTime() : 0;
                return timeB - timeA;
            });

            var selectedTalks = limit > 0 ? talks.slice(0, limit) : talks;
            var markup = "";
            if (container.id === "all-talks-list") {
                markup = renderYearAccordion(selectedTalks, nowDate);
            } else {
                markup = selectedTalks
                    .map(function (talk) {
                        return renderTalkItem(talk, nowDate);
                    })
                    .join("");
            }

            container.innerHTML = markup || '<div class="list-group-item px-0 text-muted">No talks available yet.</div>';
        } catch (error) {
            container.innerHTML = '<div class="list-group-item px-0 text-danger">Unable to load talks right now.</div>';
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        var containers = document.querySelectorAll("#talks-list, #all-talks-list");
        containers.forEach(function (container) {
            initTalksList(container);
        });
    });
})();
