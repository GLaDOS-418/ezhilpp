(function () {
  var STORAGE_KEY = "theme-preference";

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
  }

  function applyTheme(theme) {
    if (theme === "auto") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    updateToggleIcon(theme);
  }

  function getEffectiveTheme(stored) {
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function updateToggleIcon(theme) {
    var btn = document.getElementById("dark-mode-toggle");
    if (!btn) return;
    var effective =
      theme === "dark" || theme === "light" ? theme : getEffectiveTheme(theme);
    // sun icon for dark mode (click to go light), moon icon for light mode (click to go dark)
    btn.setAttribute(
      "aria-label",
      effective === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
    var icon = btn.querySelector("i");
    if (icon) {
      icon.setAttribute(
        "data-feather",
        effective === "dark" ? "sun" : "moon"
      );
      if (typeof feather !== "undefined") feather.replace();
    }
  }

  function cycleTheme() {
    var stored = getStoredTheme();
    var effective = getEffectiveTheme(stored);
    var next;
    // Smart toggle: skip states that look identical to current
    if (effective === "dark") {
      // Currently looks dark -> go to light
      next = "light";
    } else {
      // Currently looks light -> go to dark
      next = "dark";
    }
    setStoredTheme(next);
    applyTheme(next);
  }

  // Apply stored theme immediately (only if user has explicitly chosen)
  var stored = getStoredTheme();
  if (stored && stored !== "auto") {
    applyTheme(stored);
  }
  // If no stored preference, leave data-theme unset so CSS media query (system default) controls

  // Set up toggle button after DOM is ready
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("dark-mode-toggle");
    if (btn) {
      btn.addEventListener("click", cycleTheme);
      updateToggleIcon(stored || "auto");
    }

    // Listen for OS theme changes when in auto mode
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", function () {
        if (!getStoredTheme() || getStoredTheme() === "auto") {
          updateToggleIcon("auto");
        }
      });
  });
})();

// Sticky heading breadcrumb trail
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var trail = document.getElementById("heading-trail");
    var markdown = document.querySelector(".markdown");
    if (!trail || !markdown) return;

    var headings = Array.prototype.slice.call(
      markdown.querySelectorAll("h2, h3")
    );
    if (headings.length === 0) return;

    // Assign IDs to headings that don't have one (Hugo usually generates them)
    headings.forEach(function (h, i) {
      if (!h.id) h.id = "heading-" + i;
    });

    // Get heading level as number
    function level(h) {
      return parseInt(h.tagName.charAt(1), 10);
    }

    // Build the current trail from a heading
    function buildTrail(activeIndex) {
      if (activeIndex < 0) return [];
      var stack = [];
      var targetLevel = level(headings[activeIndex]);

      // Walk backward to build ancestor chain
      stack.push(headings[activeIndex]);
      var currentLevel = targetLevel;
      for (var i = activeIndex - 1; i >= 0; i--) {
        var l = level(headings[i]);
        if (l < currentLevel) {
          stack.unshift(headings[i]);
          currentLevel = l;
        }
      }
      return stack;
    }

    function renderTrail(stack) {
      if (stack.length === 0) {
        trail.classList.remove("visible");
        trail.innerHTML = "";
        return;
      }
      var html = stack
        .map(function (h) {
          return (
            '<a class="trail-item" href="#' +
            h.id +
            '">' +
            h.textContent +
            "</a>"
          );
        })
        .join('<span class="trail-separator">&gt;</span>');
      trail.innerHTML = html;
      trail.classList.add("visible");
    }

    // Compute header bottom for sticky offset
    function getHeaderBottom() {
      var header = document.querySelector(".header");
      if (!header) return 0;
      var rect = header.getBoundingClientRect();
      return rect.height;
    }

    // Set trail top position based on header height
    function updateTrailPosition() {
      trail.style.top = getHeaderBottom() + "px";
    }

    updateTrailPosition();
    window.addEventListener("resize", updateTrailPosition);

    // Track which heading was last scrolled past
    var lastActiveIndex = -1;

    // Use scroll-based tracking for reliability
    function updateOnScroll() {
      updateTrailPosition();
      var scrollY = window.scrollY || window.pageYOffset;
      var offset = getHeaderBottom() + 40; // header + trail + buffer
      var activeIndex = -1;

      for (var i = 0; i < headings.length; i++) {
        var rect = headings[i].getBoundingClientRect();
        if (rect.top <= offset) {
          activeIndex = i;
        } else {
          break;
        }
      }

      if (activeIndex !== lastActiveIndex) {
        lastActiveIndex = activeIndex;
        renderTrail(buildTrail(activeIndex));
      }
    }

    // Throttled scroll handler
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          updateOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Initial check
    updateOnScroll();
  });
})();
