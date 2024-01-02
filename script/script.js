jQuery(document).ready(function($) {
    function toggleNav() {
        var myNav = $("#myNav");
        var burgerBtn = $(".burger__btn");
        var burgerLink = $(".burger-link");

        if (myNav.height() === 0 || myNav.height() === undefined) {
            myNav.css({
                height: "100%",
                opacity: "1"
            });
            burgerBtn.attr("src", "/wp-content/themes/photographe-event/img/close-icon.svg");
            burgerLink.addClass("burger-link-animation");
        } else {
            myNav.css({
                height: "0",
                opacity: "0"
            });
            burgerBtn.attr("src", "/wp-content/themes/photographe-event/img/burger-menu.svg");
            burgerLink.removeClass("burger-link-animation");
        }
    }

    $(".burger-link, .burger__btn").on("click", function() {
        toggleNav();
    });
});
