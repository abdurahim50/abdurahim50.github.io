/* ==========================================================================
   Shared site behaviour: theme toggle, mobile nav, footer year.
   No dependencies, no build step.
   ========================================================================== */

(function () {
  "use strict";

  /* --- Theme -------------------------------------------------------------
     The site is dark by default. Everyone lands on dark on their first visit,
     regardless of their OS setting; only a previous choice on this site
     overrides it, and that's remembered in localStorage.

     The inline script in each <head> applies the theme before first paint so
     the page never flashes the wrong one; this block just wires the button.

     Want to respect the visitor's OS setting instead? Replace the inline
     script in every page <head> with:
       var t = localStorage.getItem('theme');
       if (!t) t = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
       document.documentElement.setAttribute('data-theme', t);
  */
  const root = document.documentElement;

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      /* private browsing — ignore */
    }
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    });
  }

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  });

  setTheme(root.getAttribute("data-theme") || "dark");

  /* --- Mobile navigation ------------------------------------------------- */
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks = document.getElementById("nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("is-open")) {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  /* --- Footer year ------------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
