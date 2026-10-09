<?php
/**
 * Services page (page slug: offer).
 *
 * @package abbas-bazian
 */

get_header();

$abbas_details = abbas_service_details();
?>
<div class="section-padding">
	<div class="container-page">
		<div class="text-center">
			<h1 class="text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">خدماتی که ارائه می‌دهم</h1>
			<p class="section-subtitle mx-auto max-w-2xl">هر بخش از پروژه شما با دقت و استاندارد اروپایی طراحی می‌شود</p>
		</div>

		<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
			<?php foreach ( abbas_services() as $abbas_service ) : ?>
				<div class="card-surface group p-7 transition-all duration-300 hover:border-brand-blue/50 hover:shadow-[0_0_24px_rgba(110,168,254,0.08)]">
					<div class="flex items-center gap-4">
						<span class="text-3xl font-bold text-brand-blue/30 transition-colors group-hover:text-brand-blue/60"><?php echo esc_html( $abbas_service['number'] ); ?></span>
						<h2 class="text-lg font-semibold text-text-primary"><?php echo esc_html( $abbas_service['title'] ); ?></h2>
					</div>
					<p class="mt-4 text-sm leading-relaxed text-text-secondary"><?php echo esc_html( $abbas_service['description'] ); ?></p>
					<ul class="mt-5 space-y-2">
						<?php
						$abbas_items = isset( $abbas_details[ $abbas_service['title'] ] ) ? $abbas_details[ $abbas_service['title'] ] : array();
						foreach ( $abbas_items as $abbas_item ) :
							?>
							<li class="flex items-start gap-2 text-sm text-text-secondary">
								<?php abbas_icon( 'check', 'mt-0.5 h-4 w-4 shrink-0 text-brand-green' ); ?>
								<?php echo esc_html( $abbas_item ); ?>
							</li>
						<?php endforeach; ?>
					</ul>
				</div>
			<?php endforeach; ?>
		</div>

		<div class="mt-12 text-center">
			<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn-primary">
				<?php abbas_icon( 'message', 'h-4 w-4' ); ?>
				شروع پروژه من
			</a>
		</div>
	</div>
</div>
<?php
get_footer();
