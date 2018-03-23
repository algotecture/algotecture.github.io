(function (window) {
    let preloader = document.getElementById("css-preloader");

    function fadeOut(element) {
        element.style.opacity = 1;

        let interval = setInterval(() => {
            element.style.opacity = element.style.opacity - 0.05;

            if (element.style.opacity <= 0.05) {
                clearInterval(interval);
                element.style.display = "none";
            }
        }, 16);
    }
        
    window.onload = () => setTimeout(() => fadeOut(preloader), 1000);
})(window)