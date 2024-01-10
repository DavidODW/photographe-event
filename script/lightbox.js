jQuery(document).ready(function() {
    jQuery(".suggest__img_fullscreen").click(function() {
        var postId = jQuery(this).data("id-photo");
        openLightbox();
        changePostContent(postId);
    });

    jQuery("#lightbox__close").click(function() {
        closeLightbox();
    });

    function openLightbox() {
        jQuery("#lightbox").css("display", "block");
    }

    function closeLightbox() {
        jQuery("#lightbox").css("display", "none");
    }

    var ajax_url = ajax_object.ajax_url;
    var postContainer = jQuery('#lightbox-content');

    function changePostContent(postId) {
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
});
