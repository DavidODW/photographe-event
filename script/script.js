document.addEventListener('DOMContentLoaded', function() {
    function toggleNav() {
        var myNav = document.getElementById("myNav");
        var burgerBtn = jQuery(".burger__btn");
        var burgerLink = jQuery(".burger-link");

        if (myNav.style.height === "0%" || myNav.style.height === "") {
            myNav.style.height = "100%";
            myNav.style.opacity = "1";
            burgerBtn.attr("src", "/wp-content/themes/photographe-event/img/close-icon.svg");
            burgerLink.addClass("burger-link-animation");
        } else {
            myNav.style.height = "0%";
            myNav.style.opacity = "0";
            burgerBtn.attr("src", "/wp-content/themes/photographe-event/img/burger-menu.svg");
            burgerLink.removeClass("burger-link-animation");
        }
    }

    jQuery(".burger-link, .burger__btn").on("click", function() {
        toggleNav();
    });
});