<?php
/**
 * Closing call-to-action band.
 *
 * @package abbas-bazian
 */

$abbas_site = abbas_site();
?>
<section class="section-padding">
	<div class="container-page">
		<div class="relative overflow-hidden rounded-2xl border border-[#1E2A3A] bg-[#121D2B] px-6 py-12 text-center md:py-16">
			<div class="pointer-events-none absolute -top-20 right-1/3 h-60 w-60 rounded-full opacity-10 blur-3xl" style="background: radial-gradient(circle, #22C77D, transparent)" aria-hidden="true"></div>
			<div class="relative">
				<h2 class="text-2xl font-bold text-text-primary sm:text-3xl">آماده‌اید پروژه خود را شروع کنید؟</h2>
				<p class="mx-auto mt-4 max-w-xl text-sm text-text-secondary sm:text-base">
					همین حالا تماس بگیرید تا درباره نیازهای وب‌سایت شما صحبت کنیم.
					مشاوره اولیه رایگان است.
				</p>
				<div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
					<a href="<?php echo esc_url( $abbas_site['eitaa'] ); ?>" target="_blank" rel="noopener noreferrer" class="btn-primary w-full sm:w-auto">
						<?php abbas_icon( 'message', 'h-4 w-4' ); ?>
						مشاوره رایگان
					</a>
					<a href="<?php echo esc_url( $abbas_site['phone_link'] ); ?>" class="btn-secondary w-full sm:w-auto">
						<span class="ltr-text"><?php echo esc_html( $abbas_site['phone'] ); ?></span>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
