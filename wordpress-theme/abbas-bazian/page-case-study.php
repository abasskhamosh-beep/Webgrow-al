<?php
/**
 * Portfolio page (page slug: case-study).
 *
 * @package abbas-bazian
 */

get_header();
?>
<div class="section-padding">
	<div class="container-page">
		<div class="text-center">
			<h1 class="text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">نمونه کارها</h1>
			<p class="section-subtitle">چند نمونه از پروژه‌های اخیر</p>
		</div>

		<div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<?php foreach ( abbas_projects() as $abbas_project ) : ?>
				<div class="card-surface group overflow-hidden">
					<div class="relative aspect-[4/3] overflow-hidden">
						<img src="<?php echo esc_url( $abbas_project['image'] ); ?>" alt="<?php echo esc_attr( $abbas_project['title'] ); ?>" loading="lazy" class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105">
						<div class="absolute inset-0 bg-gradient-to-t from-[#0B1420] via-transparent to-transparent opacity-80"></div>
						<span class="absolute right-3 top-3 rounded-full border border-[#1E2A3A] bg-[#0B1420]/80 px-3 py-1 text-xs text-brand-blue backdrop-blur-sm"><?php echo esc_html( $abbas_project['category'] ); ?></span>
					</div>
					<div class="p-5">
						<h2 class="text-sm font-semibold text-text-primary"><?php echo esc_html( $abbas_project['title'] ); ?></h2>
						<div class="mt-3 flex flex-wrap gap-2">
							<span class="rounded-md border border-[#1E2A3A] bg-[#0F1826] px-2.5 py-1 text-xs text-text-secondary">WordPress</span>
							<span class="rounded-md border border-[#1E2A3A] bg-[#0F1826] px-2.5 py-1 text-xs text-text-secondary">Elementor</span>
						</div>
						<a href="<?php echo esc_url( home_url( $abbas_project['path'] ) ); ?>" class="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-blue">
							مشاهده جزئیات
							<?php abbas_icon( 'arrow-left', 'h-3 w-3' ); ?>
						</a>
					</div>
				</div>
			<?php endforeach; ?>
		</div>

		<div class="mt-12 rounded-2xl border border-[#1E2A3A] bg-[#0F1826] p-8 text-center">
			<p class="text-sm text-text-secondary">
				برای مشاهده جزئیات بیشتر هر پروژه یا درخواست پروژه مشابه، در تماس
				باشید.
			</p>
			<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn-secondary mt-5">
				تماس با من
				<?php abbas_icon( 'arrow-left', 'h-4 w-4' ); ?>
			</a>
		</div>
	</div>
</div>
<?php
get_footer();
