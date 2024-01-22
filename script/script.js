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
/////////////////////// gestion des filtres de la front-page ///////////////////////////////////////////////////////
jQuery(document).ready(function($) {  
    var categorie = '';
    var format = '';
    var tri = '';
    const categoriesList = $('#categories_photo li');
    const formatsList = $('#formats_photo li');
    const triList = $('#tri_photo li');


    // permet de donner le meme comportement qu'un selecteur a ma liste
    function handleListItemClick(categoryType) {
        return function () {
            var category = $(this).attr('value');
            console.log('Selected ' + categoryType + ':', category);

            if (categoryType === 'categorie') {
                categorie = category;
            } else if (categoryType === 'format') {
                format = category;
            } else if (categoryType === 'tri') {
                tri = category;
            }

            $(this).siblings().removeClass('selected'); 
            $(this).addClass('selected');// utilise la classe selected pour trouver la ligne en cour

            console.log('Selected category:', categorie);
            console.log('Selected format:', format);
            console.log('Selected tri:', tri);
        };
    }

    // renvoit la value de ma ligne au clic
    categoriesList.click(handleListItemClick('categorie'));

    formatsList.click(handleListItemClick('format'));

    triList.click(handleListItemClick('tri'));

 $('.pe__home__filter__selector li').click(function() {
     var ajax_url = custom_script_vars.ajax_url;
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
 
 

    /////////////////////// gestion de l'affichage des photos archives///////////////////////////////////////////////////////

    let page = 2; 
    const postsPerPage = 8;
    const container = $('#photo-container');
    const loadMoreButton = $('#load-more-button');

    loadMoreButton.on('click', function () {
        // je créais un tableau contenant les id des posts deja affiché pour permettre de les exclure 
        photoIds = [];
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
    $('.pe__home__filter__selector li').click(function() {
        // Afficher le bouton
        loadMoreButton.show();
    });
    






});
/////////////////////// listes déroulantes pour filtres //////////////////////////////////////////////////////
jQuery(document).ready(function() {

function toggleListItems(listId) {
    var list = jQuery('#' + listId);
    var items = list.find('li:not(.default-option)');
    var defaultOption = list.find('.default-option');
    var filterHiddenElement = list.find('.filter-hidden');
    var filterHiddenContent = filterHiddenElement.length > 0 ? filterHiddenElement.html().trim() : '';

    var isListOpen = false;

    // fermeture au clic hors de la liste
    function closeList() {
        items.hide();
        defaultOption.find('span').removeClass('selected_span_open').addClass('selected_span_close');
        jQuery(document).off('click', closeList);
    }

    defaultOption.on('click', function (event) {
        event.stopPropagation();
        var defaultContent = defaultOption.html().trim();
        if (defaultContent !== filterHiddenContent) {
            defaultOption.html(filterHiddenContent);
        }
        isListOpen = !isListOpen;

        // Mettre à jour la classe en fonction de isListOpen
        defaultOption.find('span').toggleClass('selected_span_open selected_span_close');

        if (isListOpen) {
            // Si la liste est ouverte, enregistrez l'événement de fermeture
            jQuery(document).on('click', closeList);
        } else {
            defaultOption.find('span').removeClass('selected_span_close');
            jQuery(document).off('click', closeList);
        }

        // Toggle les éléments de la liste
        items.toggle();
    });

    items.on('click', function () {
        var clickedItem = jQuery(this);
        defaultOption.html(clickedItem.html());
        items.hide();
        isListOpen = false;

        // Mettre à jour la classe
        defaultOption.find('span').removeClass('selected_span_close').addClass('selected_span_open');

        // Désenregistrer l'événement de fermeture car la liste est déjà fermée
        jQuery(document).off('click', closeList);
    });
}

toggleListItems('categories_photo');
toggleListItems('formats_photo');
toggleListItems('tri_photo');
});