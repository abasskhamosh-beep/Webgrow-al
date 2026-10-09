<?php
/**
 * About section.
 *
 * @package abbas-bazian
 */
?>
<section class="section-padding border-y border-[#1E2A3A] bg-[#0F1826]">
	<div class="container-page">
		<div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
			<div class="flex justify-center lg:justify-start">
				<div class="relative w-full max-w-sm">
					<div class="absolute inset-0 rounded-2xl opacity-20 blur-2xl" style="background: radial-gradient(circle, #6EA8FE, transparent)" aria-hidden="true"></div>
					<div class="relative overflow-hidden rounded-2xl border border-[#1E2A3A]">
						<img src="<?php echo esc_url( abbas_about_image() ); ?>" alt="عباس بازیان، طراح سایت" loading="lazy" class="h-auto w-full object-cover">
					</div>
				</div>
			</div>

			<div class="text-center lg:text-right">
				<h2 class="section-title">سلام، من عباس بازیان هستم</h2>
				<p class="mt-5 text-sm leading-relaxed text-text-secondary sm:text-base">
					من عباس بازیان هستم، طراح و توسعه‌دهنده وب‌سایت از جویبار، مازندران.
					برای کسب‌وکارهای کوچک و متوسط وب‌سایت‌هایی می‌سازم که با تمرکز بر
					سرعت، سئو و تبدیل مشتری، بازدیدکنندگان را به مشتری تبدیل می‌کنند.
				</p>

				<ul class="mt-6 space-y-3">
					<?php foreach ( abbas_facts() as $abbas_fact ) : ?>
						<li class="flex items-start gap-2 text-sm text-text-secondary sm:text-base">
							<?php abbas_icon( 'check', 'mt-0.5 h-5 w-5 shrink-0 text-brand-green' ); ?>
							<?php echo esc_html( $abbas_fact ); ?>
						</li>
					<?php endforeach; ?>
				</ul>

				<div class="mt-8">
					<a href="<?php echo esc_url( home_url( '/about/' ) ); ?>" class="btn-secondary">
						بیشتر درباره من
						<?php abbas_icon( 'arrow-left', 'h-4 w-4' ); ?>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
