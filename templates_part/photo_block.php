<div class="suggest__img__item " id="suggestImgItem1">
                <div class="suggest__img__hover">
                <div class="suggest__img__info">
                    <p>RÉFÉRENCE : <?php $post__meta__reference = get_field('reference');echo get_field('reference'); ?> </p>
                    <p>CATÉGORIE : <?php echo strip_tags(get_the_term_list($post->ID, 'categorie__photo')); ?></p>
                  </div>
                  <a aria-label="open post" href="<?php the_permalink(); ?>">
                    <img class="hover__icon suggest__img_eyes"src="<?php echo get_template_directory_uri(); ?>/img/Icon_eyeicon.svg"  alt="eyes icon">
                  </a>
                    <img aria-label="open lightbox" class="hover__icon suggest__img_fullscreen"src="<?php echo get_template_directory_uri(); ?>/img/icon_fullscreen.svg"  data-id-photo ="<?php echo get_the_id(); ?>" alt="fullscreen icon">
                </div>
                
                <div class="suggest__img__picture">
                    <?php the_post_thumbnail('photoblock__picture'); ?>
                </div>


              </div>