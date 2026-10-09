<?php
/**
 * Fallback template — blog listing, archives and search results.
 *
 * @package abbas-bazian
 */

get_header();
?>

<div class="container-page section-padding">
	<?php if ( have_posts() ) : ?>

		<h1 class="section-title text-center">
			<?php
			if ( is_home() && ! is_front_page() ) {
				single_post_title();
			} elseif ( is_search() ) {
				printf( 'نتایج جستجو برای: %s', esc_html( get_search_query() ) );
			} elseif ( is_archive() ) {
				the_archive_title();
			} else {
				echo 'بلاگ';
			}
			?>
		</h1>

		<div class="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6">
			<?php
			while ( have_posts() ) :
				the_post();
				?>
				<article class="card-surface p-6">
					<h2 class="text-lg font-semibold text-text-primary">
						<a class="text-link" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
					</h2>
					<div class="mt-3 text-sm leading-relaxed text-text-secondary">
						<?php the_excerpt(); ?>
					</div>
				</article>
				<?php
			endwhile;
			?>
		</div>

		<div class="mt-10 text-center text-sm text-text-secondary">
			<?php the_posts_pagination( array( 'mid_size' => 1 ) ); ?>
		</div>

	<?php else : ?>
		<p class="text-center text-text-secondary">مطلبی یافت نشد.</p>
	<?php endif; ?>
</div>

<?php
get_footer();
