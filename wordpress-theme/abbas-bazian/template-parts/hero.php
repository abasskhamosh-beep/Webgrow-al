<?php
/**
 * Hero — scroll-scrubbed video.
 *
 * The section carries the scroll range, `#hero-pin` is the pinned viewport and
 * `#hero-video` is scrubbed by assets/js/hero-scrub.js. The base <img> doubles
 * as the fallback, so the hero is never blank.
 *
 * @package abbas-bazian
 */

$abbas_site = abbas_site();

$abbas_badges = array(
	array( 'clock', '۲ سال تجربه' ),
	array( 'check', '+۲۰ پروژه موفق' ),
	array( 'message', 'پاسخ زیر ۲۴ ساعت' ),
);
?>
<section id="hero" class="relative border-b border-[#1E2A3A]" style="height: calc(100vh + 200vh)">
	<div id="hero-pin" class="sticky top-0 h-screen w-full overflow-hidden">
		<div class="absolute inset-0" aria-hidden="true">
			<img src="<?php echo esc_url( abbas_hero_image() ); ?>" alt="" class="absolute inset-0 h-full w-full object-cover">
		</div>

		<video
			id="hero-video"
			data-src-base="<?php echo esc_url( get_template_directory_uri() . '/assets/video/' ); ?>"
			preload="auto"
			muted
			playsinline
			disablepictureinpicture
			tabindex="-1"
			aria-hidden="true"
			class="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 ease-out"
		></video>

		<div class="absolute inset-0 bg-gradient-to-t from-[#0B1420]/80 via-[#0B1420]/15 to-[#0B1420]/40" aria-hidden="true"></div>

		<div class="container-page relative z-20 flex h-full items-center">
			<div id="hero-copy" class="max-w-2xl text-center will-change-transform lg:text-right" style="text-shadow: 0 2px 24px rgba(11, 20, 32, 0.7)">
				<span class="inline-block rounded-full border border-brand-blue/30 bg-brand-blue/5 px-4 py-1.5 text-xs font-medium text-brand-blue">طراح سایت در مازندران</span>

				<h1 class="mt-5 text-3xl font-bold leading-tight text-text-primary sm:text-4xl md:text-5xl">طراحی سایت وردپرس و فروشگاهی در مازندران</h1>

				<p class="mt-5 text-base leading-relaxed text-text-secondary sm:text-lg">طراحی سایت حرفه‌ای با وردپرس و المنتور؛ سریع، سئو محور و آماده برای تبدیل بازدیدکننده به مشتری.</p>

				<div class="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
					<a href="<?php echo esc_url( $abbas_site['eitaa'] ); ?>" target="_blank" rel="noopener noreferrer" class="btn-primary w-full sm:w-auto">
						<?php abbas_icon( 'message', 'h-4 w-4' ); ?>
						مشاوره رایگان
					</a>
					<a href="<?php echo esc_url( home_url( '/case-study/' ) ); ?>" class="btn-secondary w-full sm:w-auto">
						<?php abbas_icon( 'eye', 'h-4 w-4' ); ?>
						مشاهده نمونه‌کارها
					</a>
				</div>

				<div class="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
					<?php foreach ( $abbas_badges as $abbas_badge ) : ?>
						<div class="flex items-center gap-2 text-sm text-text-secondary">
							<?php abbas_icon( $abbas_badge[0], 'h-4 w-4 text-brand-green' ); ?>
							<?php echo esc_html( $abbas_badge[1] ); ?>
						</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>

		<div id="hero-loader" class="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex flex-col items-center gap-2">
			<div class="h-0.5 w-24 overflow-hidden rounded-full bg-white/15">
				<div class="h-full w-1/2 animate-pulse rounded-full bg-brand-blue"></div>
			</div>
			<span class="text-[11px] text-white/60">در حال آماده‌سازی تجربه…</span>
		</div>
	</div>
</section>
