<?php
/**
 * Services grid.
 *
 * @package abbas-bazian
 */
?>
<section class="section-padding">
	<div class="container-page">
		<div class="text-center">
			<h2 class="section-title">خدماتی که ارائه می‌دهم</h2>
			<p class="section-subtitle mx-auto max-w-2xl">هر بخش از پروژه شما با دقت و استاندارد اروپایی طراحی می‌شود</p>
		</div>

		<div class="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
			<?php foreach ( abbas_services() as $abbas_service ) : ?>
				<a href="<?php echo esc_url( home_url( $abbas_service['path'] ) ); ?>" class="card-surface group flex flex-col p-6 transition-all duration-300 hover:border-brand-blue/50 hover:shadow-[0_0_24px_rgba(110,168,254,0.08)]">
					<span class="text-3xl font-bold text-brand-blue/30 transition-colors group-hover:text-brand-blue/60"><?php echo esc_html( $abbas_service['number'] ); ?></span>
					<h3 class="mt-4 text-base font-semibold text-text-primary"><?php echo esc_html( $abbas_service['title'] ); ?></h3>
					<p class="mt-2 flex-1 text-sm leading-relaxed text-text-secondary"><?php echo esc_html( $abbas_service['description'] ); ?></p>
					<span class="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-blue opacity-0 transition-opacity group-hover:opacity-100">
						اطلاعات بیشتر
						<?php abbas_icon( 'arrow-left', 'h-3 w-3' ); ?>
					</span>
				</a>
			<?php endforeach; ?>
		</div>

		<div class="mt-10 text-center">
			<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn-primary">شروع پروژه من</a>
		</div>
	</div>
</section>
