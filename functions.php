<?php
function photographe_event_theme_assets() {
    wp_enqueue_script('jquery' );
    wp_enqueue_style('photographe_styles', get_stylesheet_uri(), array(), '1.0');
    wp_enqueue_style('photographe_theme', get_template_directory_uri() . '/css/theme.css', array(), '1.0');
    wp_enqueue_script('photographe_script', get_template_directory_uri() . '/script/script.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'photographe_event_theme_assets');


function theme_setup() {
    add_theme_support('post-thumbnails');

    add_theme_support('title-tag');

    register_nav_menus(array(
        'main-menu' => 'Menu Principal',
    ));
}
add_action('after_setup_theme', 'theme_setup');



?>