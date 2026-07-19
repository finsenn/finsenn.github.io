document.addEventListener("DOMContentLoaded", function() {
    
    const navbar = document.getElementById("navbar");

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
});