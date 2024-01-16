<?php
function photographe_event_theme_assets() {
    wp_enqueue_script('jquery', 'https://code.jquery.com/jquery-3.6.4.min.js', array(), '3.6.4', true);
    wp_enqueue_style('photographe_styles', get_stylesheet_uri(), array(), '1.0');
    wp_enqueue_style('photographe_theme', get_template_directory_uri() . '/css/theme.css', array(), '1.0');
    wp_enqueue_script('photographe_script', get_template_directory_uri() . '/script/script.js', array('jquery'), null, true);
    wp_enqueue_script('photographe_lightbox', get_template_directory_uri() . '/script/lightbox.js', array('jquery'), null, true);
    wp_enqueue_script('archives', get_template_directory_uri() . '/script/archive.js', array('jquery'), '1.0', true);
    wp_localize_script('photographe_script', 'ajax_object', array('ajax_url' => admin_url('admin-ajax.php')));
    wp_localize_script('photographe_script', 'custom_script_vars', array('ajax_url' => admin_url('admin-ajax.php'),'nonce' => wp_create_nonce('custom-ajax-nonce'),));
    wp_localize_script('archives', 'archivePhotoSettings', array('ajaxUrl' => admin_url('admin-ajax.php'),'postsPerPage' => 8,));
}
add_action('wp_enqueue_scripts', 'photographe_event_theme_assets','enqueue_jquery');


function theme_setup() {
    add_theme_support('post-thumbnails');

    add_theme_support('title-tag');

    register_nav_menus(array(
        'main-menu' => 'Menu Principal',
        'footer-menu' => 'Menu pied de page'
    ));
}
add_action('after_setup_theme', 'theme_setup');



function tout_droit_reserve($items, $args) {
    if ($args->theme_location == 'footer-menu') {
        $items .= '<li><p>TOUS DROITS RÉSERVÉS</p></li>';
    }

    return $items;
}

add_filter('wp_nav_menu_items', 'tout_droit_reserve', 10, 2);

// Récupération de la valeur du champ reference des post image pour les convertir en variable jquery
function post_modal_reference() {
    $post_meta_reference = get_field('reference');
    wp_localize_script('jquery', 'custom_vars', array('post_meta_reference' => $post_meta_reference));
}
add_action('wp_enqueue_scripts', 'post_modal_reference');


// permet de charger les photos qui ne sont pas encore affichées sur la page archive et de l'acceuil
function load_more_photos() {
    $page = $_POST['page'];
    $posts_per_page = $_POST['posts_per_page'];
    $photoIds = $_POST['post__not_in'];
    //var_dump($photoIds);
    $posts_per_page =8;
    //var_dump($posts_per_page);
    $total_photo_posts = wp_count_posts('photo')->publish;
    //var_dump($total_photo_posts);
    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => -1,
        'paged' => $page,
        'post__not_in' => $photoIds
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) {{
        $count = 0;
        while ($query->have_posts() && $count < $posts_per_page) {{
            $query->the_post();
            get_template_part('templates_part/photo_block');
            $count++;
        }}
        wp_reset_postdata();



    }}

    die();
}

add_action('wp_ajax_load_more_photos', 'load_more_photos');
add_action('wp_ajax_nopriv_load_more_photos', 'load_more_photos');


// changement de l'image du hero header par une image aleatoire 
    
function theme_enqueue_scripts() {
    wp_localize_script('photographe_script', 'ajax_object', array('ajax_url' => admin_url('admin-ajax.php')));
}

add_action('wp_enqueue_scripts', 'theme_enqueue_scripts');

function get_random_images_callback() {
    $images = get_random_images();
    wp_send_json($images);
}

add_action('wp_ajax_get_random_images', 'get_random_images_callback');
add_action('wp_ajax_nopriv_get_random_images', 'get_random_images_callback');

function get_random_images() {
    $random_images = array();

    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => -1, 
        'orderby' => 'rand',   
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $random_images[] = get_the_post_thumbnail(null, 'large'); 
        }
        wp_reset_postdata();
    }

    return $random_images;
}

// requéte ajax pour les filtres

function custom_update_gallery() {
    check_ajax_referer('custom-ajax-nonce', 'nonce');
    $categorie = $_POST['categorie'];
    $format = $_POST['format'];
    $tri = $_POST['tri'];

    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => 12,
        'paged' => 1,
        'orderby' => 'date', 
        'order' => 'ASC',
    );


    // selecteur tri
    if ($tri && strtolower($tri) === 'desc') {
        $args['order'] = 'DESC';

    } else {
        $args['order'] = 'ASC';

    }

    // selecteur categorie
    if ($categorie) {
        $args['tax_query'][] = array(
            'taxonomy' => 'categorie__photo',
            'field' => 'slug',
            'terms' => $categorie,
        );
    }

    // selecteur format
    if ($format) {
        $args['tax_query'][] = array(
            'taxonomy' => 'format_photo',
            'field' => 'slug',
            'terms' => $format,
        );
    }

    $suggest_posts_query = new WP_Query($args);

    if ($suggest_posts_query->have_posts()) {
        ob_start();
        while ($suggest_posts_query->have_posts()) {
            $suggest_posts_query->the_post();
            get_template_part('templates_part/photo_block');
        }
        wp_reset_postdata();
        $response = ob_get_clean();
    } else {
        $response = '<p>No photos post to display.</p>';
    }

    echo $response;
    die();
}

add_action('wp_ajax_custom_update_gallery', 'custom_update_gallery');
add_action('wp_ajax_nopriv_custom_update_gallery', 'custom_update_gallery');


// creation du corps de ma la lightbox à partir de mon post_id passage du post_id via l'image pour générer l'index pour la navigation

function get_thumbnail_by_id_callback() {
    $post_id = $_POST['post_id'];
    $thumbnail_url = get_the_post_thumbnail_url($post_id, 'full');
    // bloc image
    echo '<div id="lightbox-image-container" class="lightbox-image-container">';
    echo '<img class="active" src="' . esc_url($thumbnail_url) . '" data-id-photo ="' . $post_id . '" alt="photo">';
    echo '</div>';
    echo '<div id="lightbox-infos-container" class="lightbox-infos-container">';
    
    // affichage de la référence
    $reference = get_field('reference', $post_id);
    if ($reference) {
        echo '<p class="lightbox-infos-container-reference">RÉFÉRENCE : ' . esc_html($reference) . '</p>';
    }

    // affichage de la categorie
    $categories = get_the_terms($post_id, 'categorie__photo');
    if ($categories) {
        $category_names = array_map(function($category) {
            return $category->name;
        }, $categories);
        echo '<p class="lightbox-infos-container-categorie">CATÉGORIE : ' . esc_html(implode(', ', $category_names)) . '</p>';
    }

    echo '</div>';

    wp_die();
}

add_action('wp_ajax_get_thumbnail_by_id', 'get_thumbnail_by_id_callback');
add_action('wp_ajax_nopriv_get_thumbnail_by_id', 'get_thumbnail_by_id_callback');

// creation d'un tableau $post_ids contenant les ids des post type photo
function post_photo_array() {
    check_ajax_referer('custom-ajax-nonce', 'nonce');

    $current_post_id = isset($_POST['current_post_id']) ? $_POST['current_post_id'] : 0;
    $categories = get_the_terms($current_post_id, 'categorie__photo');

    if ($categories && !is_wp_error($categories)) {
        $category_ids = wp_list_pluck($categories, 'term_id');
    } else {
        $category_ids = array();
    }

    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => -1,
        'orderby' => 'date',
        'order' => 'DESC',
    );

    $query = new WP_Query($args);
    $post_ids = array();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $post_ids[] = get_the_ID();
        }
        wp_reset_postdata();
    }

    wp_send_json(array('post_ids' => $post_ids));
}

add_action('wp_ajax_post_photo_array', 'post_photo_array');
add_action('wp_ajax_nopriv_post_photo_array_id', 'post_photo_array');

?>

