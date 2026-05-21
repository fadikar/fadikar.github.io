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
                var iconClass = isPdfLink(slide.url) ? "bi-file-earmark-pdf" : "bi-box-arrow-up-right";
                return (
                    '<a href="' + slide.url + '" class="talk-slide-link" target="_blank" rel="noopener noreferrer">' +
                        '<i class="bi ' + iconClass + '" aria-hidden="true"></i>' +
                        '<span>' + label + '</span>' +
                    "</a>"
                );
            })
            .join("");

        return links ? '<div class="talk-links">' + links + "</div>" : "";
    }

    function renderTalkItem(talk, nowDate) {
        var parsedDate = parseTalkDate(talk.date);
        if (!parsedDate) {
            return "";
        }

        var isUpcoming = parsedDate >= nowDate;
        var dateLabel = formatDisplayDate(parsedDate);
        var dateMarkup = isUpcoming
            ? '<span class="talk-upcoming-pill">Upcoming</span><span class="talk-date">' + dateLabel + "</span>"
            : '<span class="talk-date">' + dateLabel + "</span>";

        var metaParts = [];
        if (talk.location) {
            metaParts.push(talk.location);
        }
        if (talk.talk_type) {
            metaParts.push(talk.talk_type);
        }
        var metaLine = metaParts.length > 0
            ? '<small class="text-muted">' + metaParts.join(" · ") + "</small>"
            : "";

        return (
            '<div class="list-group-item px-0">' +
                '<div class="d-flex flex-wrap justify-content-between align-items-start gap-3">' +
                    '<div class="talk-info">' +
                        '<h6 class="mb-1 talk-title">' + (talk.title || "Untitled Talk") + "</h6>" +
                        '<p class="mb-1 text-muted talk-venue">' + (talk.venue || "") + "</p>" +
                        metaLine +
                    "</div>" +
                    '<div class="talk-meta">' +
                        '<div class="talk-date-line">' + dateMarkup + "</div>" +
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

    function renderYearGroupedList(talks, nowDate) {
        var grouped = groupTalksByYear(talks);
        var years = Object.keys(grouped).sort(function (a, b) {
            return parseInt(b, 10) - parseInt(a, 10);
        });

        if (years.length === 0) {
            return '<div class="text-muted">No talks available yet.</div>';
        }

        return years.map(function (year) {
            var talksMarkup = grouped[year]
                .map(function (talk) { return renderTalkItem(talk, nowDate); })
                .join("");

            return (
                '<section class="talks-year-group mb-5">' +
                    '<h2 class="section-heading talks-year-heading">' + year + "</h2>" +
                    '<div class="list-group list-group-flush">' + talksMarkup + "</div>" +
                "</section>"
            );
        }).join("");
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
                markup = renderYearGroupedList(selectedTalks, nowDate);
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
