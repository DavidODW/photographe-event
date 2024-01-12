jQuery(document).ready(function() {
    ///////////////////////observateurs d'évenements/////////////////////
        //ouverture de ma lightbox au clic sur l'icone de plein ecran des photos
    jQuery(".suggest__img_fullscreen").click(function() {
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
        navigateToNextPost();
    });

    jQuery(".lightbox__arrow__left").click(function() {
        navigateToPreviousPost();
        
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
    var ajax_url = ajax_object.ajax_url;
    var postContainer = jQuery('#lightbox-content');

    function changePostContent(postId) {
        console.log(postId)
        jQuery.ajax({
            url: ajax_url,
            type: 'POST',
            data: {
                'action': 'get_post_by_id',
                'post_id': postId,
                'action': 'get_thumbnail_by_id',
                'post_id': postId,
            },
            success: function(response) {
                postContainer.html(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
        //chargement du post précédent et passage au dernier post quand ont arrive à l'index 0
    function navigateToPreviousPost() {{
        var currentPostId = jQuery('.active').data('id-photo');
        var nonce = custom_script_vars.nonce;
        console.log('photo active')
        console.log(currentPostId)
        jQuery.ajax({
            url: ajax_object.ajax_url,
            type: 'POST',
            data: {
                action: 'get_previous_post_id',
                current_post_id: currentPostId,
                nonce: nonce
            },
            success: function(response) {{
                console.log('test4')
                if (response.post_ids) {{
                    console.log('test5')
                    var postIds = response.post_ids;
                    var currentPostIndex = postIds.indexOf(parseInt(currentPostId));
                    console.log('index previous')
                    console.log(currentPostIndex)
                    console.log('array previous')
                    console.log(postIds)
                    var previousPostId = postIds[currentPostIndex - 1];
                    console.log('previous post id')
                    console.log(previousPostId)
                    if (previousPostId) {{
                        changePostContent(previousPostId);
                    }} else {
                    var lastPostId = postIds[postIds.length - 1];
                    changePostContent(lastPostId);
                }
                }}
            }},
            error: function(error) {{
                console.log(error);
            }}
        });
    }}
        //chargement du post suivant et passage au premier post quand ont arrive à la fin du tableau
    function navigateToNextPost() {{
        var currentPostId = jQuery('.active').data('id-photo');
        var nonce = custom_script_vars.nonce;
        console.log('photo active')
        console.log(currentPostId)
        jQuery.ajax({
            url: ajax_object.ajax_url,
            type: 'POST',
            data: {
                action: 'get_previous_post_id',
                current_post_id: currentPostId,
                nonce: nonce
            },
            success: function(response) {{
                console.log('test4')
                if (response.post_ids) {{
                    console.log('test5')
                    var postIds = response.post_ids;
                    var currentPostIndex = postIds.indexOf(parseInt(currentPostId));
                    console.log('index next')
                    console.log(currentPostIndex)
                    console.log('array next')
                    console.log(postIds)
                    var nextPostId = postIds[currentPostIndex + 1];
                    console.log('next post id')
                    console.log(nextPostId)
                    if (nextPostId) {{                      
                        changePostContent(nextPostId);
                    }} else {
                        var firstPostId = postIds[0];
                        changePostContent(firstPostId);
                    }
                }}
            }},
            error: function(error) {{
                console.log(error);
            }}
        });
    }}
});
