<?php
/**
 * Generic page template — used by any page that has no dedicated template.
 *
 * @package abbas-bazian
 */

get_header();
?>
<div class="section-padding">
	<div class="container-page">
		<div class="mx-auto max-w-3xl">
			<?php
			while ( have_posts() ) :
				the_post();
				?>
				<h1 class="text-2xl font-bold text-text-primary sm:text-3xl"><?php the_title(); ?></h1>
				<div class="mt-8 space-y-6 text-sm leading-relaxed text-text-secondary sm:text-base">
					<?php the_content(); ?>
				</div>
				<?php
			endwhile;
			?>
		</div>
	</div>
</div>
<?php
get_footer();
