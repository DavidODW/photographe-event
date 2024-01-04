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
    // pour faire disparaitre ou apparaitre le menu au clic 
    $(".menu-item,.burger-link, .burger__btn").on("click", function() {
        toggleNav(); 
    });


    // Ouverture de la modale via le bouton contact du menu des photos 
    var modal = $('#myModal');
    var btnSingle = $('#post__modal__button');
    var modalCloseButton = $('.modal__user__button');
    $(document).ready(function(){
        var post_meta_reference = custom_vars.post_meta_reference; 
        $("#modal__user__photo").val(post_meta_reference);
      });
    // Ouverture de la modale via le bouton contact du menu nav
    btnSingle.click(function() {
        modal.css('display', 'block');
    });

    

    // Fermeture de la modale via le bouton envoyer de la modale
    modalCloseButton.click(function() {
        modal.addClass('fade-out');
        setTimeout(function() {
            modal.css('display', 'none').removeClass('fade-out');
        }, 500);
    });

    jQuery(document).ready(function($) {
        // Set the interval for changing the image every 10 seconds
        setInterval(function() {
            var currentImage = $('.pe__home__hero__picture.active');
            var nextImage = currentImage.next('.pe__home__hero__picture');

            if (nextImage.length === 0) {
                nextImage = $('.pe__home__hero__picture:first');
            }

            currentImage.removeClass('active');
            nextImage.addClass('active');
        }, 10000); // 10 seconds interval
    });
    
});

