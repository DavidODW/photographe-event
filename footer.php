<footer>  
<?php get_template_part('templates_part/contact_modal');?>
<?php
wp_nav_menu(array(
    'theme_location' => 'footer-menu',
    'menu_class' => 'footer-menu', 
));

?>
</footer>
<?php wp_footer(); ?>

</body>
</html>