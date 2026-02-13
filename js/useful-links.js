(function () {
    "use strict";

    function groupByCategory(items) {
        var grouped = {};
        items.forEach(function (item) {
            var category = (item.category && item.category.trim()) ? item.category.trim() : "General";
            if (!grouped[category]) {
                grouped[category] = [];
            }
            grouped[category].push(item);
        });
        return grouped;
    }

    function iconForType(type) {
        var t = (type || "").toLowerCase();
        if (t === "video") return "bi-play-btn";
        if (t === "pdf") return "bi-file-earmark-pdf";
        if (t === "presentation") return "bi-easel";
        return "bi-link-45deg";
    }

    function renderItem(item) {
        var icon = iconForType(item.type);
        var title = item.title || "Untitled resource";
        var url = item.url || "#";
        var description = item.description ? ('<div class="text-muted small mt-1">' + item.description + '</div>') : "";

        return (
            '<li class="mb-3">' +
                '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' +
                    '<i class="bi ' + icon + ' me-1"></i>' + title +
                '</a>' +
                description +
            '</li>'
        );
    }

    function renderGroupedLinks(items) {
        if (!items.length) {
            return (
                '<div class="col-12">' +
                    '<p class="mb-2">No links added yet.</p>' +
                    '<p class="text-muted small mb-0">Add entries in <code>data/useful-links.json</code> with fields: <code>title</code>, <code>url</code>, optional <code>category</code>, <code>type</code>, <code>description</code>.</p>' +
                '</div>'
            );
        }

        var grouped = groupByCategory(items);
        var categories = Object.keys(grouped).sort();
        var html = "";

        categories.forEach(function (category) {
            html += '<div class="col-12 mt-2">';
            html += '<div class="card shadow-sm useful-links-card"><div class="card-body">';
            html += '<h3 class="useful-links-category mb-3">' + category + '</h3>';
            html += '<ul class="useful-links-list mb-0">';
            grouped[category].forEach(function (item) {
                html += renderItem(item);
            });
            html += "</ul></div></div></div>";
        });

        return html;
    }

    async function init() {
        var container = document.getElementById("useful-links-list");
        if (!container) return;

        var source = container.dataset.source || "data/useful-links.json";
        try {
            var response = await fetch(source);
            if (!response.ok) throw new Error("Failed to load links");
            var payload = await response.json();
            var items = Array.isArray(payload) ? payload : payload.links;
            if (!Array.isArray(items)) items = [];
            container.innerHTML = renderGroupedLinks(items);
        } catch (error) {
            container.innerHTML = '<div class="col-12 text-danger">Unable to load useful links right now.</div>';
        }
    }

    document.addEventListener("DOMContentLoaded", init);
})();
