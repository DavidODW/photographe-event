<?php 
/*
Partial: single.php
Template Name: articles photos
*/

?>
<?php get_header(); ?>
  <?php if( have_posts() ) : while( have_posts() ) : the_post(); ?>
    
    <article class="post">

      <section class="post__section post__header">

        <div class="post__header__meta">
          <h1><?php the_title(); ?></h1>
          <p>RÉFÉRENCE : <?php $post__meta__reference = get_field('reference');echo get_field('reference'); ?> </p>
          <p>CATÉGORIE : <?php echo strip_tags(get_the_term_list($post->ID, 'categorie__photo')); ?></p>
          <p>FORMAT : <?php echo strip_tags(get_the_term_list($post->ID, 'format_photo')); ?></p>
          <p>TYPE : <?php echo get_field('type'); ?> </p>
          <p>ANNÉE : <?php echo get_the_date('Y'); ?> </p>     
        </div>
        <div class="post__header__img">
          <img class="hover__icon post__img_fullscreen suggest__img_fullscreen "src="<?php echo get_template_directory_uri(); ?>/img/icon_fullscreen.svg" data-id-photo ="<?php echo get_the_id(); ?>"alt="fullscreen icon">
          <?php the_post_thumbnail('single-photo__picture'); ?>
        </div>
      </section>
      
      <section class="post__section post__body">
        <div class="post__contact">
          <p>Cette photo vous intéresse ? </p>
          <input aria-label="contact button" id="post__modal__button"class="post__contact__button" value="Contact" type="button">
        </div>
        <div class="post__miniature">
          <div class="post__miniature__img">
            <?php 
              $prev_post = get_previous_post();
              $next_post = get_next_post();
              $current_post_id = get_the_ID();
              $prev_post_id = $prev_post ? $prev_post->ID : '';
              $next_post_id = $next_post ? $next_post->ID : '';
              $next_post_thumbnail = get_the_post_thumbnail($next_post_id, 'thumbnail');
              $prev_post_thumbnail = get_the_post_thumbnail($prev_post_id, 'thumbnail');
              $curr_post_thumbnail = get_the_post_thumbnail($current_post_id, 'thumbnail');
              $prev_post_permalink = get_permalink($prev_post_id);
              $next_post_permalink = get_permalink($next_post_id);
              if ($next_post_thumbnail) {
                echo '<div class="next-post-thumbnail thumb-nav-min"><a href="' . esc_url($next_post_permalink) . '">' . $next_post_thumbnail . '</a></div>';
                echo '<div class="previous-post-thumbnail thumb-nav-min"><a href="' . esc_url($prev_post_permalink) . '">' . $prev_post_thumbnail . '</a></div>';
                echo '<div class="current-post-thumbnail thumb-nav-min"><a >' . $curr_post_thumbnail . '</a></div>';
            }  
    
            ?>
          </div> 
          <div class="post__miniature__arrow">
            <a href="<?php echo esc_url($prev_post_permalink); ?>">
              <img id="post__miniature__arrow__left" class="arrow arrow__left"src="<?php echo get_template_directory_uri(); ?>/img/left-arrow.svg" alt="fleche gauche">
            </a>
            <a href="<?php echo esc_url($next_post_permalink); ?>">
              <img id="post__miniature__arrow__right" class="arrow arrow__right"src="<?php echo get_template_directory_uri(); ?>/img/right-arrow.svg" alt="fleche droite">
            </a>
          </div> 
        </div>
      </section>
      
      <section class="post__section post__footer">
        <h2>VOUS AIMEREZ AUSSI</h2>
        <div class="post__suggest__img">
          <?php 
          $current_category = get_the_terms($post->ID, 'categorie__photo');
          $suggest_posts_query = new WP_Query(array(
            'post_type' => 'photo', 
            'posts_per_page' => 2,
            'orderby' => 'rand',
            'tax_query' => array(
              array(
                'taxonomy' => 'categorie__photo',
                'field' => 'id',
                'terms' => $current_category[0]->term_id,
              ),
            ),
          ));

          if ($suggest_posts_query->have_posts()) {
            while ($suggest_posts_query->have_posts()) {
              $suggest_posts_query->the_post();

              get_template_part('templates_part/photo_block');

            }
            wp_reset_postdata();
          }
          ?>
        </div>

      </section>
    </article>

  <?php endwhile; endif; ?>
<?php get_footer(); ?>