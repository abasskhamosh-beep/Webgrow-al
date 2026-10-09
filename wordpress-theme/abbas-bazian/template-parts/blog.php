<?php
/**
 * Blog preview grid.
 *
 * @package abbas-bazian
 */
?>
<section class="section-padding border-y border-[#1E2A3A] bg-[#0F1826]">
	<div class="container-page">
		<div class="text-center">
			<h2 class="section-title">بلاگ</h2>
			<p class="section-subtitle">مقالات آموزشی درباره وردپرس و سئو</p>
		</div>

		<div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<?php foreach ( abbas_posts() as $abbas_post ) : ?>
				<a href="<?php echo esc_url( home_url( $abbas_post['path'] ) ); ?>" class="card-surface group overflow-hidden">
					<div class="relative aspect-[16/10] overflow-hidden">
						<img src="<?php echo esc_url( $abbas_post['image'] ); ?>" alt="<?php echo esc_attr( $abbas_post['title'] ); ?>" loading="lazy" class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105">
					</div>
					<div class="p-5">
						<h3 class="text-sm font-semibold text-text-primary transition-colors group-hover:text-brand-blue"><?php echo esc_html( $abbas_post['title'] ); ?></h3>
						<span class="mt-3 inline-flex items-center gap-1 text-xs text-brand-blue">
							ادامه مطلب
							<?php abbas_icon( 'arrow-left', 'h-3 w-3' ); ?>
						</span>
					</div>
				</a>
			<?php endforeach; ?>
		</div>

		<div class="mt-10 text-center">
			<a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" class="btn-secondary">
				مشاهده همه مقالات
				<?php abbas_icon( 'arrow-left', 'h-4 w-4' ); ?>
			</a>
		</div>
	</div>
</section>
