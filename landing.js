/* PREPPA landing — motion + nav. House style: animate everything, 200–340ms ease-out. */
(function () {
  "use strict";

  /* mark JS available so the reveal animation can attach (base state stays visible) */
  document.documentElement.classList.add("js");

  /* ---- scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- mobile menu ---- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobileMenu");
  var close = document.getElementById("mmClose");
  function openMenu() { menu.classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeMenu() { menu.classList.remove("open"); document.body.style.overflow = ""; }
  if (burger) burger.addEventListener("click", openMenu);
  if (close) close.addEventListener("click", closeMenu);
  if (menu) menu.addEventListener("click", function (e) {
    if (e.target === menu || e.target.closest(".mm-link") || e.target.closest(".mm-actions")) closeMenu();
  });

  /* ---- nav shadow lift on scroll ---- */
  var nav = document.querySelector(".nav");
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (nav) nav.style.boxShadow = window.scrollY > 24
          ? "0 10px 30px rgba(23,21,15,.18)"
          : "";
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
})();
