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
        var dots = [];
        if (dotsContainer) {
            dotsContainer.innerHTML = "";
            slides.forEach(function (_, i) {
                var dot = document.createElement("span");
                dot.className = "about-cover-dot" + (i === 0 ? " active" : "");
                dotsContainer.appendChild(dot);
                dots.push(dot);
            });
        }

        var index = 0;
        window.setInterval(function () {
            slides[index].classList.remove("active");
            if (dots[index]) dots[index].classList.remove("active");
            index = (index + 1) % slides.length;
            slides[index].classList.add("active");
            if (dots[index]) dots[index].classList.add("active");
        }, 4000);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAboutCarousel);
    } else {
        initAboutCarousel();
    }
})();
