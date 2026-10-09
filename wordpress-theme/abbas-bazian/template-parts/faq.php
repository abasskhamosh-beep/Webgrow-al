<?php
/**
 * FAQ accordion. The first entry starts open, matching the design.
 * Toggling is handled by assets/js/main.js.
 *
 * @package abbas-bazian
 */

$abbas_faqs = abbas_faqs();
?>
<section class="section-padding">
	<div class="container-page">
		<div class="text-center">
			<h2 class="section-title">سوالات متداول</h2>
			<p class="section-subtitle">پاسخ به رایج‌ترین پرسش‌های شما</p>
		</div>

		<div class="mx-auto mt-10 max-w-3xl space-y-3">
			<?php foreach ( $abbas_faqs as $abbas_index => $abbas_faq ) : ?>
				<?php $abbas_open = 0 === $abbas_index; ?>
				<div class="card-surface overflow-hidden" data-faq>
					<button
						type="button"
						data-faq-toggle
						class="flex w-full items-center justify-between gap-4 p-5 text-right"
						aria-expanded="<?php echo $abbas_open ? 'true' : 'false'; ?>"
					>
						<span class="text-sm font-semibold text-text-primary sm:text-base"><?php echo esc_html( $abbas_faq['question'] ); ?></span>
						<span data-faq-chevron class="<?php echo $abbas_open ? 'rotate-180' : ''; ?>">
							<?php abbas_icon( 'chevron', 'h-5 w-5 shrink-0 text-brand-blue transition-transform duration-300' ); ?>
						</span>
					</button>
					<div
						data-faq-panel
						class="grid transition-all duration-300 <?php echo $abbas_open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'; ?>"
					>
						<div class="overflow-hidden">
							<p class="px-5 pb-5 text-sm leading-relaxed text-text-secondary"><?php echo esc_html( $abbas_faq['answer'] ); ?></p>
						</div>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>
