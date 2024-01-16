/////////////////////// gestion du menu burger///////////////////////////////////////////////////////
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
            });
            burgerBtn.attr("src", "/wp-content/themes/photographe-event/img/burger-menu.svg");
            burgerLink.removeClass("burger-link-animation");
        }
    }
    // pour faire disparaitre ou apparaitre le menu au clic 
    jQuery(".menu-item,.burger-link, .burger__btn").on("click", function() {
        toggleNav(); 
    });

});
/////////////////////// gestion de la modale de contact///////////////////////////////////////////////////////
jQuery(document).ready(function($) {

    function openModal(modal) {
        modal.css('display', 'block');
    }

    function closeModal(modal) {
        modal.addClass('fade-out');
        setTimeout(function() {
            modal.css('display', 'none').removeClass('fade-out');
        }, 500);
    }

    // Modale pour le menu nav
    var modalNav = $('#myModal');
    var btnNav = $('#menu-item-31');
    var modalCloseButtonNav = $('.modal__user__button:first');

    btnNav.on('click', function(event) {
        event.stopPropagation();
        openModal(modalNav);
    });

    modalCloseButtonNav.on('click', function(event) {
        event.stopPropagation();
        closeModal(modalNav);
    });

    // Modale pour le menu des photos
    var modalPhoto = $('#myModal');
    var btnSingle = $('#post__modal__button');
    var modalCloseButtonPhoto = $('.modal__user__button');
    var post_meta_reference = custom_vars.post_meta_reference;

    btnSingle.click(function(event) {
        event.stopPropagation();
        $("#modal__user__photo").val(post_meta_reference);
        openModal(modalPhoto);
    });

    modalCloseButtonPhoto.click(function(event) {
        event.stopPropagation();
        closeModal(modalPhoto);
    });

    // fermeture au clic a l'exterieur de la modale
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.modal-content').length) {
            closeModal(modalNav);
            closeModal(modalPhoto);
        }
    });

});

/////////////////////// gestion de l'image aléatoire de l'heroheader///////////////////////////////////////////////////////
jQuery(document).ready(function(jQuery) {
    
    var ajax_url = custom_script_vars.ajax_url;
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
                newImage.animate({ opacity: 1 }, 1000);// changement de l'image du hero header toutes les 10 secondes
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    setInterval(changeImage, 10000); 
});
/////////////////////// gestion des filtres de la front-page ///////////////////////////////////////////////////////
jQuery(document).ready(function(jQuery) {  
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
    
/////////////////////// gestion des miniatures de présentation des articles photos ///////////////////////////////////////////////////////
jQuery(document).ready(function ($) {
    
    $('.previous-post-thumbnail, .next-post-thumbnail').hide();

    // gestion de la fléche gauche
    $('#post__miniature__arrow__left').hover(function () {
        $('.previous-post-thumbnail').stop(true, true).fadeIn();
    }, function () {
        $('.previous-post-thumbnail').stop(true, true).fadeOut();
    });

    // gestion de la fléche droite
    $('#post__miniature__arrow__right').hover(function () {
        $('.next-post-thumbnail').stop(true, true).fadeIn();
    }, function () {
        $('.next-post-thumbnail').stop(true, true).fadeOut();
    });
});

/////////////////////// gestion de l'affichage des photos archives///////////////////////////////////////////////////////
jQuery(document).ready(function ($) {

    let page = 2; 
    const postsPerPage = 8;
    const container = $('#photo-container');
    const loadMoreButton = $('#load-more-button');

    loadMoreButton.on('click', function () {
        photoIds = [];
        var categorie = jQuery('select[name="categorie__photo"]').val();
        var format = jQuery('select[name="format_photo"]').val();
        var tri = jQuery('select[name="tri_photo"]').val();
        jQuery('.suggest__img_fullscreen').each(function() {
            photoIds.push($(this).data('id-photo'));
        });
        photoIds = photoIds.filter((id, index) => {
            return photoIds.indexOf(id) === index;
        });
        console.log(photoIds);
        const ajaxurl = custom_script_vars.ajax_url;
        console.log(photoIds);
        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                'action': 'load_more_photos',
                'page': page,
                'posts_per_page': postsPerPage,
                'post__not_in' : photoIds,
                'categorie': categorie,
                'format': format,
                'tri': tri
            },
            success: function (response) {
                console.log(response);
                container.append(response);
                page++;

                // Masquer le bouton si la réponse ne contient pas de nouveaux posts
                if ($(response.trim()).find('.suggest__img_fullscreen').length === 0) {
                    loadMoreButton.hide();
                } else {
                    loadMoreButton.show();
                }
            }
        });

    });


    // Gestionnaire d'événements pour les changements de sélecteurs
    jQuery('select').change(function() {
        // Afficher le bouton
        loadMoreButton.show();
    });
});

