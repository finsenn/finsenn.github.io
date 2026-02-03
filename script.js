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
});