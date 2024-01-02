<?php
function photographe_event_theme_assets() {
    wp_enqueue_script('jquery');
    wp_enqueue_style('photographe_styles', get_stylesheet_uri(), array(), '1.0');
    wp_enqueue_style('photographe_theme', get_template_directory_uri() . '/css/theme.css', array(), '1.0');
    wp_enqueue_script('photographe_script', get_template_directory_uri() . '/script/script.js', array('jquery'), null, true);
    wp_enqueue_script('photographe_modal', get_template_directory_uri() . '/script/modal.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'photographe_event_theme_assets');


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


?>