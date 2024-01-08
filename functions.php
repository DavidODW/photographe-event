<?php
function photographe_event_theme_assets() {
    wp_enqueue_script('jquery', 'https://code.jquery.com/jquery-3.6.4.min.js', array(), '3.6.4', true);
    wp_enqueue_style('photographe_styles', get_stylesheet_uri(), array(), '1.0');
    wp_enqueue_style('photographe_theme', get_template_directory_uri() . '/css/theme.css', array(), '1.0');
    wp_enqueue_script('photographe_script', get_template_directory_uri() . '/script/script.js', array('jquery'), null, true);
    wp_enqueue_script('photographe_modal', get_template_directory_uri() . '/script/modal.js', array(), null, true);
    wp_enqueue_script('photographe_lightbox', get_template_directory_uri() . '/script/lightbox.js', array('jquery'), null, true);
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

// permet d'afficher les photos supplémentaires des archives au clic sur le bouton

    // permet de passer les variables necessaires au script archives dont le nombre de post par page pour la pagination
function enqueue_custom_scripts() {
    wp_enqueue_script('archives', get_template_directory_uri() . '/script/archive.js', array('jquery'), '1.0', true);
    wp_localize_script('archives', 'archivePhotoSettings', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'postsPerPage' => 8,
    ));
}
add_action('wp_enqueue_scripts', 'enqueue_custom_scripts');

    // permet de charger les photos qui ne sont pas encore affichées sur la page archive
function load_more_photos() {
    $page = $_POST['page'];
    $posts_per_page = $_POST['posts_per_page'];

    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => $posts_per_page,
        'paged' => $page,
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            get_template_part('templates_part/photo_block');
        }
        wp_reset_postdata();
    }

    die();
}

add_action('wp_ajax_load_more_photos', 'load_more_photos');
add_action('wp_ajax_nopriv_load_more_photos', 'load_more_photos');


// changement de l'image du hero header par une image aleatoire 
    // transfére un tableau avec l'adresse de la base de donnée à mon script
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

?>