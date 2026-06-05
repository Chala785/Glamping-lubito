document.addEventListener("DOMContentLoaded", () => {

    // Navbar
    fetch("/Components/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar").innerHTML = data;

            requestAnimationFrame(() => {
                const menuToggle = document.getElementById("ham");
                const navMenu = document.getElementById("mobileMenu");

                if (menuToggle && navMenu) {
                    menuToggle.addEventListener("click", () => {
                        navMenu.classList.toggle("open");
                        menuToggle.classList.toggle("open");
                    });
                } else {
                    console.warn("Elementos no encontrados. Revisa los IDs en navbar.html");
                }
            });
        });

    // Footer
    fetch("/Components/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });

});