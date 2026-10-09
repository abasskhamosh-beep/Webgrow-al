<?php
/**
 * Posts index — used when a page is set as the WordPress "Posts page".
 * Falls back to the curated cards when the site has no posts yet.
 *
 * @package abbas-bazian
 */

get_header();

$abbas_items = array();

while ( have_posts() ) :
	the_post();
	$abbas_items[] = array(
		'title' => get_the_title(),
		'url'   => get_permalink(),
		'image' => (string) get_the_post_thumbnail_url( get_the_ID(), 'large' ),
	);
endwhile;

if ( ! $abbas_items ) {
	$abbas_items = abbas_post_items();
}

$abbas_title = 'بلاگ';
if ( is_home() && ! is_front_page() && get_option( 'page_for_posts' ) ) {
	$abbas_title = get_the_title( get_option( 'page_for_posts' ) );
}

get_template_part(
	'template-parts/blog-list',
	null,
	array(
		'items'    => $abbas_items,
		'title'    => $abbas_title,
		'subtitle' => 'مقالات آموزشی درباره وردپرس و سئو',
	)
);
?>

<div class="container-page pb-16 text-center text-sm text-text-secondary">
	<?php the_posts_pagination( array( 'mid_size' => 1 ) ); ?>
</div>

<?php
get_footer();
