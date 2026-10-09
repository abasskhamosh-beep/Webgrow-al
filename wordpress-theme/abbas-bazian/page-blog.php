<?php
/**
 * Blog page (page slug: blog).
 *
 * If this page is instead chosen as the WordPress "Posts page"
 * (تنظیمات ← خواندن), WordPress renders home.php and lists the real posts.
 *
 * @package abbas-bazian
 */

get_header();

get_template_part(
	'template-parts/blog-list',
	null,
	array(
		'items'     => abbas_post_items(),
		'title'     => 'بلاگ',
		'subtitle'  => 'مقالات آموزشی درباره وردپرس و سئو',
		'show_note' => true,
	)
);

get_footer();
