jQuery(document).ready(function($) {
    ///////////////////////observateurs d'évenements/////////////////////
        
    //ouverture de ma lightbox au clic sur l'icone de plein ecran des photos
    $(document).on('click', '.suggest__img_fullscreen', function () {
        var postId = jQuery(this).data('id-photo');
        openLightbox();
        changePostContent(postId);
    });
       
    //fermeture de ma lightbox au clic sur l'icone de fermeture
    jQuery("#lightbox__close").click(function() {
        closeLightbox();
    });
       
    //fleche de navigation gauche et droite      
    jQuery(".lightbox__arrow__right").click(function() {

        navigateToPost(1);

    });

    jQuery(".lightbox__arrow__left").click(function() {
        navigateToPost(-1);
    });

   ///////////////////////fonctionnement de la lightbox /////////////////////
    
   //ouverture de la lightbox
    function openLightbox() {
        jQuery("#lightbox").css("display", "block");
    }
        
    //fermeture de la lightbox
    function closeLightbox() {
        jQuery("#lightbox").css("display", "none");
    }


    //mise à jour de mon id et de l'image en prenant comme parametre l'id 
    var ajax_url = custom_script_vars.ajax_url;
    var postContainer = jQuery('#lightbox-content');

    function changePostContent(postId) {
   
        jQuery.ajax({
            url: ajax_url,
            type: 'POST',
            data: {
                'action': 'get_post_by_id',
                'post_id': postId,
                'action': 'get_thumbnail_by_id',
                'post_id': postId
            },
            success: function(response) {
                postContainer.html(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    //navigation infini dans les images des posts (offset : sens dans lequel ont parcourt le tableau incrementation ou décrementation)
    function navigateToPost(offset) {
        var currentPostId = $('.active').data('id-photo');
        var nonce = custom_script_vars.nonce;

        $.ajax({
            url: custom_script_vars.ajax_url,
            type: 'POST',
            data: {
                action: 'post_photo_array',
                current_post_id: currentPostId,
                nonce: nonce
            },
            success: function(response) {
                if (response.post_ids) {
                    var postIds = response.post_ids;
                    var currentPostIndex = postIds.indexOf(parseInt(currentPostId));
                    var newPostIndex = (currentPostIndex + offset + postIds.length) % postIds.length; //utilisation du modulo pour reboucler en début ou fin du tableau (navigation infini)
                    var newPostId = postIds[newPostIndex];
                    changePostContent(newPostId);
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
});
