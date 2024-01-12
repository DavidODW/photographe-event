// recupére les photos supplémentaires our archives et créer une nouvelle page pour les afficher 
jQuery(document).ready(function ($) {
    let page = 2; 
    const postsPerPage = archivePhotoSettings.postsPerPage;
    const container = $('#photo-container');

    $('#load-more-button').on('click', function () {
        const ajaxurl = archivePhotoSettings.ajaxUrl;

        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                'action': 'load_more_photos',
                'page': page,
                'posts_per_page': postsPerPage,
            },
            success: function (response) {
                container.append(response);
                page++;
            }
        });
    });
});