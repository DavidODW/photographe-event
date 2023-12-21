<?php 

// Ajouter la prise en charge des images mises en avant
add_theme_support( 'post-thumbnails' );

// Ajouter automatiquement le titre du site dans l'en-tête du site
add_theme_support( 'title-tag' );

add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {
    wp_enqueue_style('theme-style', get_template_directory_uri() . 'css/theme.css' );
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_scripts' );
function theme_enqueue_scripts() {
    wp_enqueue_script('script', get_template_directory_uri() . '/scripts/menu.js');
}  
