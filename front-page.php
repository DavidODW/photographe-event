<?php
/*
Template Name: accueil
*/
?>
<?php get_header(); ?>
<div class="pe__home">
  <div class ="pe__home_tittle">
    <h1>PHOTOGRAPHE EVENT</h1>
    <div class="pe__home__hero" id="hero-container">
        <?php
        $current_category = get_the_terms($post->ID, 'categorie__photo');
        $suggest_posts_query = new WP_Query(array(
            'post_type' => 'photo_pe',
            'posts_per_page' => 1,
            'orderby' => 'rand',
        ));

        if ($suggest_posts_query->have_posts()) {
            while ($suggest_posts_query->have_posts()) {
                $suggest_posts_query->the_post();
        ?>
                <div class="pe__home__hero__picture">
                    <?php the_post_thumbnail('large'); ?>
                </div>
        <?php
            }
            wp_reset_postdata();
        }
        ?>
    </div>
  </div>
    <div class="pe__home__gallery">

    </div>
</div>

<?php get_footer(); ?>
