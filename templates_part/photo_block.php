<div class="suggest__img__item ">
                <div class="suggest__img__hover">
                  <a href="<?php the_permalink(); ?>">
                    <img class="hover__icon suggest__img_eyes"src="<?php echo get_template_directory_uri(); ?>/img/Icon_eyeicon.svg" alt="eyes icon">
                  </a>
                    <img class="hover__icon suggest__img_fullscreen"src="<?php echo get_template_directory_uri(); ?>/img/icon_fullscreen.svg" alt="fullscreen icon">
                </div>
                <div class="suggest__img__picture">
                    <?php the_post_thumbnail('large'); ?>
                </div>
              </div>