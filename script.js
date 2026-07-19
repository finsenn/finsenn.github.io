document.addEventListener("DOMContentLoaded", function() {

    const navbar = document.getElementById("navbar");

    // Dark mode toggle (initial theme already applied by inline head script to avoid flash)
    const themeToggle = document.getElementById("theme-toggle");
    const root = document.documentElement;

    function updateToggleLabel() {
        const isDark = root.getAttribute("data-theme") === "dark";
        themeToggle.textContent = isDark ? "◑" : "◐";
        themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    }

    themeToggle.addEventListener("click", () => {
        const isDark = root.getAttribute("data-theme") === "dark";
        if (isDark) {
            root.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
        } else {
            root.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        }
        updateToggleLabel();
    });

    updateToggleLabel();

    // Function to handle scroll event
    function handleScroll() {
        if (window.scrollY > 50) {
            // If scrolled down more than 50px, add the 'scrolled' class
            navbar.classList.add("scrolled");
        } else {
            // Otherwise, remove it
            navbar.classList.remove("scrolled");
        }
    }

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll);

    // Hero entrance: stagger the name, photo, tagline, and scroll cue in on load
    document.querySelectorAll(".hero-in").forEach((el, i) => {
        el.style.transitionDelay = `${150 + i * 150}ms`;
        requestAnimationFrame(() => el.classList.add("is-visible"));
    });

    // Scroll-reveal: fade + rise elements into view as they enter the viewport
    const revealTargets = document.querySelectorAll(
        ".section-header, .skill-item, .card, .project-card, .footer-content"
    );

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealTargets.forEach((el, i) => {
        el.classList.add("reveal");
        el.style.transitionDelay = `${(i % 4) * 40}ms`;
        revealObserver.observe(el);
    });

    // Scrollspy: highlight the nav link for the section currently in view
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    const spyObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (!link) return;
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove("active"));
                link.classList.add("active");
            }
        });
    }, { rootMargin: "-40% 0px -50% 0px" });

    sections.forEach(section => spyObserver.observe(section));

    // Easter egg: a little something for anyone curious enough to open DevTools
    console.log(
        "%c" +
        " __      ___                     _   \n" +
        " \\ \\    / (_)                   | |  \n" +
        "  \\ \\  / / _ _ __   ___ ___ _ __ | |_ \n" +
        "   \\ \\/ / | | '_ \\ / __/ _ \\ '_ \\| __|\n" +
        "    \\  /  | | | | | (_|  __/ | | | |_ \n" +
        "     \\/   |_|_| |_|\\___\\___|_| |_|\\__|\n",
        "color: #3b82f6; font-family: monospace; font-size: 10px;"
    );
    console.log(
        "%cLooks like you're the curious type.",
        "color: inherit; font-size: 14px; font-weight: bold;"
    );
    console.log(
        "%cSince you're already in DevTools poking around — I'm a security engineer & pentester. " +
        "If you found something on this site that shouldn't be here, I'd genuinely love to hear about it: vincentn113@gmail.com",
        "color: #888; font-size: 12px;"
    );

    // Magnetic hover: subtle tilt/lift toward the cursor on cards
    const magneticTargets = document.querySelectorAll(".card, .project-card");
    const MAX_TILT = 6; // degrees

    magneticTargets.forEach(el => {
        el.addEventListener("mousemove", e => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            el.style.transform = `perspective(600px) rotateX(${-y * MAX_TILT}deg) rotateY(${x * MAX_TILT}deg) translateY(-4px)`;
        });

        el.addEventListener("mouseleave", () => {
            el.style.transform = "";
        });
    });
});