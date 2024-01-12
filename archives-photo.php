<?php
/*
Template Name: Archives photo
*/
get_header();
?>
<div class="archives__wrapper">
    <h1>ARCHIVES PHOTOS</h1>
    <div class="post__suggest__img" id="photo-container">
        <?php
        $posts_per_page = 8;
        $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

        $suggest_posts_query = new WP_Query(array(
            'post_type' => 'photo',
            'posts_per_page' => $posts_per_page,
            'paged' => $paged,
        ));

        if ($suggest_posts_query->have_posts()) {
            while ($suggest_posts_query->have_posts()) {
                $suggest_posts_query->the_post();
                get_template_part('templates_part/photo_block');
            }
            wp_reset_postdata();


        } else {
            echo '<p>No photos found in the archives.</p>';
        }
        ?>
    </div>

    <div class="gallery__button">
        <button id="load-more-button">chargez la suite</button>
    </div>
</div>


<?php get_footer(); ?>
