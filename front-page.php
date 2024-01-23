<?php
/*
Template Name: accueil
*/
?>
<?php get_header(); ?>

<div class="pe__home">
    <div class="pe__home_tittle">
        <h1>PHOTOGRAPHE EVENT</h1>
        <div class="pe__home__hero" id="hero-container">
            <?php
            $current_format = '';
            $current_tri = '';
            //fallback image aleatoire
            $current_category = get_the_terms($post->ID, 'categorie__photo');

            $suggest_posts_query = new WP_Query(array(
                'post_type' => 'photo',
                'posts_per_page' => 1,
                'orderby' => 'rand',
            ));

            if ($suggest_posts_query->have_posts()) {
                while ($suggest_posts_query->have_posts()) {
                    $suggest_posts_query->the_post();
                    ?>
                    <div class="pe__home__hero__picture">
                        <?php the_post_thumbnail('hero__picture'); ?>
                    </div>
                    <?php
                }
                wp_reset_postdata();
            }
            ?>
        </div>
    </div>

    <div class="pe__home__gallery">
        <div class="pe__home__filter">
            <div class="pe__home__filter__taxonomie">
            <div class="pe__home__filter__taxonomie__categories">
                <?php

                // création du selecteur categorie
                $categories = get_terms(array(
                    'taxonomy' => 'categorie__photo',
                    'hide_empty' => false,
                ));
                if (!empty($categories)) {
                    echo '<ul aria-label="category filter" id="categories_photo" name="categories_photo" class="pe__home__filter__selector">';
                    echo '<li value="" class="default-option">CATEGORIES <span class="selected_span_open"> </span></li>';
                    echo '<li value="" class="filter-hidden">CATEGORIES <span> </span></li>';
                    foreach ($categories as $category) {
                        $selected = ($current_category && $current_category[0]->term_id == $category->term_id) ? 'selected' : '';
                        echo '<li value="' . esc_attr($category->slug) . '" ' . $selected . ' class="' . esc_attr($selected) . '">' . esc_html($category->name) . '<span> </span>'. '</li>';
                    }
                    echo '</ul>';
                }
                ?>               
            </div>    
            <div class="pe__home__filter__taxonomie__formats">
                <?php
                // création du selecteur format
                $formats = get_terms(array(
                    'taxonomy' => 'format_photo',
                    'hide_empty' => false,
                ));

         
                // Formats section as ul and li
                if (!empty($formats)) {
                    echo '<ul aria-label="format filter" id="formats_photo" name="formats_photo" class="pe__home__filter__selector">';
                    echo '<li value="" class="default-option">FORMATS <span class="selected_span_open"> </span></li>';
                    echo '<li value="" class="filter-hidden">FORMATS <span> </span></li>';
                    foreach ($formats as $format) {
                        $selected = ($current_format == $format->term_id) ? 'selected' : '';
                        echo '<li value="' . esc_attr($format->slug) . '" ' . $selected . ' class="' . esc_attr($selected) . '">' . esc_html($format->name) . '<span> </span>'.'</li>';
                    }
                    echo '</ul>';
                }
                ?>
            </div>
            </div>
            <div class="pe__home__filter__date">
                <!--création du selecteur tri-->
                <ul aria-label="date filter" class="pe__home__filter__selector" id="tri_photo" name="tri_photo"> 
                    <li  class="default-option" value="">TRIER PAR <span class="selected_span_open"> </span></li>
                    <li  class="filter-hidden" value="">TRIER PAR <span> </span></li>
                    <li  value="ASC">à partir des plus anciennes <span> </span></li>
                    <li  value="DESC">à partir des plus récentes <span> </span></li>
                </ul>
            </div>

        </div>

        <div class="post__suggest__img" id="photo-container">
            <?php
            $posts_per_page = 8;
            $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

 

            $args = array(
                'post_type' => 'photo',
                'posts_per_page' => $posts_per_page,
                'paged' => $paged,
                'orderby' => 'date',
                'order' => $current_tri, // gérer l'ordre du tri
            );

            // Ajouter la catégorie sélectionnée au filtre
            if ($current_category) {
                $args['tax_query'][] = array(
                    'taxonomy' => 'categorie__photo',
                    'field' => 'id',
                    'terms' => $current_category[0]->term_id,
                );
            }

            // Ajouter le format sélectionné au filtre
            if ($current_format) {
                $args['tax_query'][] = array(
                    'taxonomy' => 'format_photo',
                    'field' => 'id',
                    'terms' => $current_format,
                );
            }


            $suggest_posts_query = new WP_Query($args);

            if ($suggest_posts_query->have_posts()) {
                while ($suggest_posts_query->have_posts()) {
                    $suggest_posts_query->the_post();
                    $post_ids[] = get_the_ID();
                    get_template_part('templates_part/photo_block');
                }
                wp_reset_postdata();
            } else {
                echo '<p>No photos post to display.</p>';
            }
            ?>
        </div>

        <div class="gallery__button">
            <button aria-label="load more" id="load-more-button">Charger plus</button>
        </div>
    </div>
</div>

<?php get_footer(); ?>
