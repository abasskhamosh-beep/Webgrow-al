<?php
/**
 * Portfolio grid.
 *
 * @package abbas-bazian
 */
?>
<section class="section-padding">
	<div class="container-page">
		<div class="text-center">
			<h2 class="section-title">نمونه کارها</h2>
			<p class="section-subtitle">چند نمونه از پروژه‌های اخیر</p>
		</div>

		<div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<?php foreach ( abbas_projects() as $abbas_project ) : ?>
				<a href="<?php echo esc_url( home_url( $abbas_project['path'] ) ); ?>" class="card-surface group overflow-hidden">
					<div class="relative aspect-[4/3] overflow-hidden">
						<img src="<?php echo esc_url( $abbas_project['image'] ); ?>" alt="<?php echo esc_attr( $abbas_project['title'] ); ?>" loading="lazy" class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105">
						<div class="absolute inset-0 bg-gradient-to-t from-[#0B1420] via-transparent to-transparent opacity-80"></div>
						<span class="absolute right-3 top-3 rounded-full border border-[#1E2A3A] bg-[#0B1420]/80 px-3 py-1 text-xs text-brand-blue backdrop-blur-sm"><?php echo esc_html( $abbas_project['category'] ); ?></span>
					</div>
					<div class="flex items-center justify-between p-5">
						<h3 class="text-sm font-semibold text-text-primary"><?php echo esc_html( $abbas_project['title'] ); ?></h3>
						<?php abbas_icon( 'arrow-left', 'h-4 w-4 text-text-secondary transition-colors group-hover:text-brand-blue' ); ?>
					</div>
				</a>
			<?php endforeach; ?>
		</div>

		<div class="mt-10 text-center">
			<a href="<?php echo esc_url( home_url( '/case-study/' ) ); ?>" class="btn-secondary">
				مشاهده همه نمونه‌کارها
				<?php abbas_icon( 'arrow-left', 'h-4 w-4' ); ?>
			</a>
		</div>
	</div>
</section>
