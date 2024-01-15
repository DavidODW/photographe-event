

jQuery(document).ready(function ($) {

    let page = 2; 
    const postsPerPage = archivePhotoSettings.postsPerPage;
    const container = $('#photo-container');

    $('#load-more-button').on('click', function () {
        photoIds = [];
        jQuery('.suggest__img_fullscreen').each(function() {
            photoIds.push($(this).data('id-photo'));
          });
          photoIds = photoIds.filter((id, index) => {
            return photoIds.indexOf(id) === index;
        });
          console.log(photoIds);
        const ajaxurl = archivePhotoSettings.ajaxUrl;
        console.log(photoIds);
        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                'action': 'load_more_photos',
                'page': page,
                'posts_per_page': postsPerPage,
                'post__not_in' : photoIds
            },
            success: function (response) {
                container.append(response);
                page++;
                console.log(photoIds);
            }
        });

    });
});