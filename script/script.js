jQuery(document).ready(function(jQuery) {
    function toggleNav() {
        var myNav = jQuery("#myNav");
        var burgerBtn = jQuery(".burger__btn");
        var burgerLink = jQuery(".burger-link");

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
    jQuery(".menu-item,.burger-link, .burger__btn").on("click", function() {
        toggleNav(); 
    });


    // Ouverture de la modale via le bouton contact du menu des photos 
    var modal = jQuery('#myModal');
    var btnSingle = jQuery('#post__modal__button');
    var modalCloseButton = jQuery('.modal__user__button');
    jQuery(document).ready(function(){
        var post_meta_reference = custom_vars.post_meta_reference; 
        jQuery("#modal__user__photo").val(post_meta_reference);
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

    // changement de l'image du hero header toutes les 10 secondes
    var ajax_url = ajax_object.ajax_url;
    var heroContainer = jQuery('#hero-container');
    var currentImageIndex = 0;

    function changeImage() {
        jQuery.ajax({
            url: ajax_url,
            type: 'POST',
            data: {
                'action': 'get_random_images',
            },
            success: function(response) {
                currentImageIndex = (currentImageIndex + 1) % response.length;
                var newImage = jQuery('<div class="pe__home__hero__picture" style="opacity: 0;">' + response[currentImageIndex] + '</div>');
                
                heroContainer.html(newImage);
                newImage.animate({ opacity: 1 }, 1000);
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    setInterval(changeImage, 10000); 

    // gestion des filtres

    
    jQuery('select').change(function() {
        
        var ajax_url = custom_script_vars.ajax_url;
        var categorie = jQuery('select[name="categorie__photo"]').val();
        var format = jQuery('select[name="format_photo"]').val();
        var tri = jQuery('select[name="tri_photo"]').val();
        
        console.log(tri)
        console.log("Tri : ", tri);
        jQuery.ajax({
            type: 'POST',
            url: ajax_url,
            data: {
                action: 'custom_update_gallery',
                nonce: custom_script_vars.nonce,
                categorie: categorie,
                format: format,
                tri: tri
            },
            success: function(response) {
                jQuery('#photo-container').html(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
    

});

