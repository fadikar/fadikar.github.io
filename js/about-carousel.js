(function () {
    "use strict";

    function initAboutCarousel() {
        var carousel = document.querySelector(".about-cover-carousel");
        if (!carousel) return;

        var slides = Array.prototype.slice.call(
            carousel.querySelectorAll(".about-cover-image")
        );
        if (slides.length <= 1) return;

        var dotsContainer = carousel.querySelector(".about-cover-dots");
        if (!dotsContainer) return;

        dotsContainer.innerHTML = "";
        var dots = [];

        function showSlide(newIndex) {
            slides.forEach(function (s) { s.classList.remove("active"); });
            dots.forEach(function (d) {
                d.classList.remove("active");
                d.setAttribute("aria-current", "false");
            });
            slides[newIndex].classList.add("active");
            dots[newIndex].classList.add("active");
            dots[newIndex].setAttribute("aria-current", "true");
        }

        slides.forEach(function (_, i) {
            var dot = document.createElement("button");
            dot.type = "button";
            dot.className = "about-cover-dot" + (i === 0 ? " active" : "");
            dot.setAttribute("aria-label", "Show cover image " + (i + 1) + " of " + slides.length);
            dot.setAttribute("aria-current", i === 0 ? "true" : "false");
            dot.addEventListener("click", function () {
                showSlide(i);
            });
            dotsContainer.appendChild(dot);
            dots.push(dot);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAboutCarousel);
    } else {
        initAboutCarousel();
    }
})();
