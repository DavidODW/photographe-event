<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1"/>  
    <?php wp_head();?>
</head>

<body <?php body_class(); ?>>
    <header class="header">
        <a class="header__logo" href="<?php echo home_url( '/' ); ?>">
            <img class="header__logo_img"src="<?php echo get_template_directory_uri(); ?>/img/logo.svg" alt="Logo">
        </a>  
        <div class="nav__menu__wrapper">
            <?php 
            wp_nav_menu( array( 'theme_location' => 'main-menu','container' => 'ul','menu_class' => 'nav__menu', ) ); ?>
        </div>
    </header>
    <?php wp_body_open(); ?>