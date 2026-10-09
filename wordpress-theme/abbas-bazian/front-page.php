<?php
/**
 * Front page — the full homepage design.
 *
 * @package abbas-bazian
 */

get_header();

get_template_part( 'template-parts/hero' );
get_template_part( 'template-parts/services' );
get_template_part( 'template-parts/about' );
get_template_part( 'template-parts/portfolio' );
get_template_part( 'template-parts/blog' );
get_template_part( 'template-parts/faq' );
get_template_part( 'template-parts/cta' );

get_footer();
