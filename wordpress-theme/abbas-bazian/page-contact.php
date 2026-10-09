<?php
/**
 * Contact page (page slug: contact).
 *
 * @package abbas-bazian
 */

get_header();

$abbas_site = abbas_site();

/*
 * Contact Form 7 integration point. When the plugin is active the shortcode
 * renders the real form; otherwise the notice below is shown instead.
 */
$abbas_cf7_shortcode = '[contact-form-7 id="bec772c" title="فرم"]';
$abbas_form_html     = do_shortcode( $abbas_cf7_shortcode );
$abbas_form_ready    = trim( $abbas_form_html ) !== $abbas_cf7_shortcode;
?>
<div class="section-padding">
	<div class="container-page">
		<div class="text-center">
			<h1 class="text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">تماس با من</h1>
			<p class="section-subtitle mx-auto max-w-2xl">برای مشاوره رایگان یا پرسش درباره پروژه، از راه‌های زیر در تماس باشید.</p>
		</div>

		<div class="mt-12 grid gap-8 lg:grid-cols-2">
			<div class="space-y-4">
				<a href="<?php echo esc_url( $abbas_site['phone_link'] ); ?>" class="card-surface flex items-center gap-4 p-5 transition-colors hover:border-brand-blue/50">
					<span class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
						<?php abbas_icon( 'phone', 'h-5 w-5' ); ?>
					</span>
					<div>
						<p class="text-xs text-text-secondary">تلفن</p>
						<p class="text-sm font-semibold text-text-primary ltr-text"><?php echo esc_html( $abbas_site['phone'] ); ?></p>
					</div>
				</a>

				<a href="<?php echo esc_url( $abbas_site['email_link'] ); ?>" class="card-surface flex items-center gap-4 p-5 transition-colors hover:border-brand-blue/50">
					<span class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
						<?php abbas_icon( 'mail', 'h-5 w-5' ); ?>
					</span>
					<div>
						<p class="text-xs text-text-secondary">ایمیل</p>
						<p class="break-all text-sm font-semibold text-text-primary"><?php echo esc_html( $abbas_site['email'] ); ?></p>
					</div>
				</a>

				<a href="<?php echo esc_url( $abbas_site['eitaa'] ); ?>" target="_blank" rel="noopener noreferrer" class="card-surface flex items-center gap-4 p-5 transition-colors hover:border-brand-green/50">
					<span class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
						<?php abbas_icon( 'message', 'h-5 w-5' ); ?>
					</span>
					<div>
						<p class="text-xs text-text-secondary">ایتا</p>
						<p class="text-sm font-semibold text-text-primary">Bazianwb@</p>
					</div>
				</a>

				<a href="<?php echo esc_url( $abbas_site['telegram'] ); ?>" target="_blank" rel="noopener noreferrer" class="card-surface flex items-center gap-4 p-5 transition-colors hover:border-brand-blue/50">
					<span class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
						<?php abbas_icon( 'send', 'h-5 w-5' ); ?>
					</span>
					<div>
						<p class="text-xs text-text-secondary">تلگرام</p>
						<p class="text-sm font-semibold text-text-primary">Abasswordpress@</p>
					</div>
				</a>

				<a href="<?php echo esc_url( $abbas_site['instagram'] ); ?>" target="_blank" rel="noopener noreferrer" class="card-surface flex items-center gap-4 p-5 transition-colors hover:border-brand-blue/50">
					<span class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
						<?php abbas_icon( 'instagram', 'h-5 w-5' ); ?>
					</span>
					<div>
						<p class="text-xs text-text-secondary">اینستاگرام</p>
						<p class="text-sm font-semibold text-text-primary">abbaswordparess@</p>
					</div>
				</a>

				<div class="card-surface flex items-center gap-4 p-5">
					<span class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-warm/10 text-brand-warm">
						<?php abbas_icon( 'map-pin', 'h-5 w-5' ); ?>
					</span>
					<div>
						<p class="text-xs text-text-secondary">موقعیت</p>
						<p class="text-sm font-semibold text-text-primary"><?php echo esc_html( $abbas_site['location'] ); ?></p>
					</div>
				</div>

				<div class="card-surface p-5">
					<div class="mb-4 flex items-center gap-2">
						<?php abbas_icon( 'clock', 'h-5 w-5 text-brand-blue' ); ?>
						<h2 class="text-sm font-semibold text-text-primary">ساعات کاری</h2>
					</div>
					<ul class="space-y-2">
						<?php foreach ( abbas_business_hours() as $abbas_hours ) : ?>
							<li class="flex items-center justify-between text-sm">
								<span class="text-text-secondary"><?php echo esc_html( $abbas_hours['day'] ); ?></span>
								<span class="<?php echo 'تعطیل' === $abbas_hours['hours'] ? 'text-brand-warm' : 'text-text-primary'; ?>"><?php echo esc_html( $abbas_hours['hours'] ); ?></span>
							</li>
						<?php endforeach; ?>
					</ul>
				</div>
			</div>

			<div class="space-y-6">
				<div class="card-surface p-6">
					<h2 class="text-base font-semibold text-text-primary">فرم تماس</h2>
					<p class="mt-2 text-sm text-text-secondary">برای ارسال پیام از فرم زیر استفاده کنید.</p>

					<?php if ( $abbas_form_ready ) : ?>
						<div class="mt-4">
							<?php echo $abbas_form_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Contact Form 7 output. ?>
						</div>
					<?php else : ?>
						<div class="mt-4 rounded-lg border border-dashed border-[#1E2A3A] bg-[#0F1826] p-6 text-center">
							<p class="text-sm text-text-secondary">فرم تماس در محیط وردپرس با افزونه Contact Form 7 فعال است.</p>
							<p class="mt-2 text-xs text-text-secondary">
								برای فعال‌سازی فرم، افزونه Contact Form 7 را نصب کنید؛ همین
								شورت‌کد به‌صورت خودکار نمایش داده می‌شود.
							</p>
							<code class="mt-3 block rounded-md bg-[#0B1420] px-3 py-2 text-xs text-brand-blue ltr-text"><?php echo esc_html( $abbas_cf7_shortcode ); ?></code>
						</div>
					<?php endif; ?>

					<a href="<?php echo esc_url( $abbas_site['eitaa'] ); ?>" target="_blank" rel="noopener noreferrer" class="btn-primary mt-4 w-full">
						<?php abbas_icon( 'message', 'h-4 w-4' ); ?>
						مشاوره رایگان در ایتا
					</a>
				</div>

				<div class="card-surface overflow-hidden">
					<iframe src="<?php echo esc_url( abbas_maps_embed() ); ?>" title="نقشه جویبار، مازندران" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="h-72 w-full border-0" allowfullscreen></iframe>
				</div>
			</div>
		</div>
	</div>
</div>
<?php
get_footer();
