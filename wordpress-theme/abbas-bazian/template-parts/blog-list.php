<?php
/**
 * Blog card grid, shared by the blog page and the WordPress posts index.
 *
 * @package abbas-bazian
 *
 * @var array $args {
 *     @type array  $items     List of cards as array( 'title' => '', 'url' => '', 'image' => '' ).
 *     @type string $title     Page heading.
 *     @type string $subtitle  Page sub-heading.
 *     @type bool   $show_note Whether to print the closing note card.
 * }
 */

$abbas_items    = isset( $args['items'] ) ? $args['items'] : array();
$abbas_title    = isset( $args['title'] ) ? $args['title'] : 'بلاگ';
$abbas_subtitle = isset( $args['subtitle'] ) ? $args['subtitle'] : 'مقالات آموزشی درباره وردپرس و سئو';
?>
<div class="section-padding">
	<div class="container-page">
		<div class="text-center">
			<h1 class="text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl"><?php echo esc_html( $abbas_title ); ?></h1>
			<p class="section-subtitle"><?php echo esc_html( $abbas_subtitle ); ?></p>
		</div>

		<?php if ( $abbas_items ) : ?>
			<div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<?php foreach ( $abbas_items as $abbas_item ) : ?>
					<a href="<?php echo esc_url( $abbas_item['url'] ); ?>" class="card-surface group overflow-hidden">
						<?php if ( ! empty( $abbas_item['image'] ) ) : ?>
							<div class="relative aspect-[16/10] overflow-hidden">
								<img src="<?php echo esc_url( $abbas_item['image'] ); ?>" alt="<?php echo esc_attr( $abbas_item['title'] ); ?>" loading="lazy" class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105">
							</div>
						<?php endif; ?>
						<div class="p-5">
							<h2 class="text-sm font-semibold text-text-primary transition-colors group-hover:text-brand-blue"><?php echo esc_html( $abbas_item['title'] ); ?></h2>
							<span class="mt-3 inline-flex items-center gap-1 text-xs text-brand-blue">
								ادامه مطلب
								<?php abbas_icon( 'arrow-left', 'h-3 w-3' ); ?>
							</span>
						</div>
					</a>
				<?php endforeach; ?>
			</div>
		<?php else : ?>
			<p class="mt-12 text-center text-sm text-text-secondary">مطلبی یافت نشد.</p>
		<?php endif; ?>

		<?php if ( ! empty( $args['show_note'] ) ) : ?>
			<div class="mt-12 rounded-2xl border border-[#1E2A3A] bg-[#0F1826] p-8 text-center">
				<p class="text-sm text-text-secondary">
					مقالات کامل در وب‌سایت اصلی قابل مشاهده هستند. برای دسترسی به همه
					مطالب به صفحه بلاگ مراجعه کنید.
				</p>
			</div>
		<?php endif; ?>
	</div>
</div>
