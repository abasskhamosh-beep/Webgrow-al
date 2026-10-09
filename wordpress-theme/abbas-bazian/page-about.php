<?php
/**
 * About page (page slug: about).
 *
 * @package abbas-bazian
 */

get_header();

$abbas_site = abbas_site();
?>
<div class="section-padding">
	<div class="container-page">
		<div class="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
			<div class="flex justify-center lg:justify-start">
				<div class="relative w-full max-w-sm">
					<div class="absolute inset-0 rounded-2xl opacity-20 blur-2xl" style="background: radial-gradient(circle, #6EA8FE, transparent)" aria-hidden="true"></div>
					<div class="relative overflow-hidden rounded-2xl border border-[#1E2A3A]">
						<img src="<?php echo esc_url( abbas_about_image() ); ?>" alt="عباس بازیان، طراح سایت" class="h-auto w-full object-cover">
					</div>
				</div>
			</div>

			<div class="text-center lg:text-right">
				<h1 class="text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">سلام، من عباس بازیان هستم</h1>
				<p class="mt-5 text-sm leading-relaxed text-text-secondary sm:text-base">
					من عباس بازیان هستم، طراح و توسعه‌دهنده وب‌سایت از جویبار، مازندران.
					برای کسب‌وکارهای کوچک و متوسط وب‌سایت‌هایی می‌سازم که با تمرکز بر
					سرعت، سئو و تبدیل مشتری، بازدیدکنندگان را به مشتری تبدیل می‌کنند.
				</p>
				<p class="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
					تخصص من طراحی سایت با وردپرس و المنتور است و در راه‌اندازی
					فروشگاه‌های اینترنتی با ووکامرس تجربه زیادی دارم. هدف من این است که
					هر پروژه با دقت، سرعت و پشتیبانی واقعی تحویل داده شود.
				</p>

				<ul class="mt-6 space-y-3">
					<?php foreach ( abbas_facts() as $abbas_fact ) : ?>
						<li class="flex items-start gap-2 text-sm text-text-secondary sm:text-base">
							<?php abbas_icon( 'check', 'mt-0.5 h-5 w-5 shrink-0 text-brand-green' ); ?>
							<?php echo esc_html( $abbas_fact ); ?>
						</li>
					<?php endforeach; ?>
				</ul>

				<div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
					<a href="<?php echo esc_url( $abbas_site['eitaa'] ); ?>" target="_blank" rel="noopener noreferrer" class="btn-primary">
						<?php abbas_icon( 'message', 'h-4 w-4' ); ?>
						مشاوره رایگان
					</a>
					<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn-secondary">
						تماس با من
						<?php abbas_icon( 'arrow-left', 'h-4 w-4' ); ?>
					</a>
				</div>
			</div>
		</div>

		<div class="mt-16 border-t border-[#1E2A3A] pt-12">
			<h2 class="text-center text-xl font-bold text-text-primary sm:text-2xl">مهارت‌ها و تخصص‌ها</h2>
			<div class="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				<?php foreach ( abbas_skills() as $abbas_skill ) : ?>
					<div class="card-surface flex items-center gap-3 p-4">
						<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue/10 text-xs font-bold text-brand-blue">✓</span>
						<span class="text-sm text-text-secondary"><?php echo esc_html( $abbas_skill ); ?></span>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</div>
</div>
<?php
get_footer();
