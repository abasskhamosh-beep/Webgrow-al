<?php
/**
 * Site footer, floating contact rail and mobile sticky bar.
 *
 * @package abbas-bazian
 */

$abbas_site = abbas_site();
?>
</main>

<footer class="border-t border-[#1E2A3A] bg-[#0F1826]">
	<div class="container-page py-12 md:py-16">
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			<div class="lg:col-span-1">
				<h3 class="text-lg font-bold text-text-primary"><?php echo esc_html( $abbas_site['name'] ); ?></h3>
				<p class="mt-3 text-sm leading-relaxed text-text-secondary"><?php echo esc_html( $abbas_site['description'] ); ?></p>
			</div>

			<div>
				<h4 class="mb-4 text-sm font-semibold text-text-primary">دسترسی سریع</h4>
				<ul class="space-y-2">
					<?php foreach ( abbas_footer_links() as $abbas_link ) : ?>
						<li>
							<a href="<?php echo esc_url( home_url( $abbas_link['path'] ) ); ?>" class="text-sm text-text-secondary transition-colors hover:text-brand-blue">
								<?php echo esc_html( $abbas_link['label'] ); ?>
							</a>
						</li>
					<?php endforeach; ?>
				</ul>
			</div>

			<div>
				<h4 class="mb-4 text-sm font-semibold text-text-primary">تماس</h4>
				<ul class="space-y-3">
					<li>
						<a href="<?php echo esc_url( $abbas_site['phone_link'] ); ?>" class="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-brand-blue">
							<?php abbas_icon( 'phone', 'h-4 w-4 shrink-0' ); ?>
							<span class="ltr-text"><?php echo esc_html( $abbas_site['phone'] ); ?></span>
						</a>
					</li>
					<li>
						<a href="<?php echo esc_url( $abbas_site['email_link'] ); ?>" class="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-brand-blue">
							<?php abbas_icon( 'mail', 'h-4 w-4 shrink-0' ); ?>
							<span class="break-all"><?php echo esc_html( $abbas_site['email'] ); ?></span>
						</a>
					</li>
					<li>
						<a href="<?php echo esc_url( $abbas_site['telegram'] ); ?>" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-brand-blue">
							<?php abbas_icon( 'send', 'h-4 w-4 shrink-0' ); ?>
							تلگرام
						</a>
					</li>
					<li>
						<a href="<?php echo esc_url( $abbas_site['instagram'] ); ?>" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-brand-blue">
							<?php abbas_icon( 'instagram', 'h-4 w-4 shrink-0' ); ?>
							اینستاگرام
						</a>
					</li>
				</ul>
			</div>

			<div>
				<h4 class="mb-4 text-sm font-semibold text-text-primary">حقوقی</h4>
				<ul class="space-y-2">
					<?php foreach ( abbas_legal_links() as $abbas_link ) : ?>
						<li>
							<a href="<?php echo esc_url( home_url( $abbas_link['path'] ) ); ?>" class="text-sm text-text-secondary transition-colors hover:text-brand-blue">
								<?php echo esc_html( $abbas_link['label'] ); ?>
							</a>
						</li>
					<?php endforeach; ?>
				</ul>
			</div>
		</div>

		<div class="mt-10 border-t border-[#1E2A3A] pt-6">
			<p class="text-center text-xs text-text-secondary">
				© <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php echo esc_html( $abbas_site['name'] ); ?> — تمامی حقوق محفوظ است.
			</p>
		</div>
	</div>
</footer>

<div class="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex">
	<a href="<?php echo esc_url( $abbas_site['instagram'] ); ?>" target="_blank" rel="noopener noreferrer" class="flex h-11 w-11 items-center justify-center rounded-full border border-[#1E2A3A] bg-[#121D2B] text-text-secondary shadow-lg transition-all hover:border-brand-blue hover:text-brand-blue" aria-label="اینستاگرام" title="اینستاگرام">
		<?php abbas_icon( 'instagram' ); ?>
	</a>
	<a href="<?php echo esc_url( $abbas_site['phone_link'] ); ?>" class="flex h-11 w-11 items-center justify-center rounded-full border border-[#1E2A3A] bg-[#121D2B] text-text-secondary shadow-lg transition-all hover:border-brand-blue hover:text-brand-blue" aria-label="تماس تلفنی" title="تماس تلفنی">
		<?php abbas_icon( 'phone' ); ?>
	</a>
	<a href="<?php echo esc_url( $abbas_site['eitaa'] ); ?>" target="_blank" rel="noopener noreferrer" class="flex h-11 w-11 items-center justify-center rounded-full bg-brand-green text-[#0B1420] shadow-lg transition-all hover:brightness-110 hover:shadow-[0_0_20px_rgba(34,199,125,0.4)]" aria-label="مشاوره در ایتا" title="مشاوره در ایتا">
		<?php abbas_icon( 'message' ); ?>
	</a>
</div>

<div class="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-3 border-t border-[#1E2A3A] bg-[#0F1826]/95 backdrop-blur-md md:hidden" style="padding-bottom: env(safe-area-inset-bottom)">
	<a href="<?php echo esc_url( $abbas_site['phone_link'] ); ?>" class="flex min-h-[48px] flex-col items-center justify-center gap-0.5 py-2 text-text-secondary transition-colors active:bg-[#121D2B]" aria-label="تماس">
		<?php abbas_icon( 'phone' ); ?>
		<span class="text-xs">تماس</span>
	</a>
	<a href="<?php echo esc_url( $abbas_site['eitaa'] ); ?>" target="_blank" rel="noopener noreferrer" class="flex min-h-[48px] flex-col items-center justify-center gap-0.5 border-x border-[#1E2A3A] py-2 text-brand-green transition-colors active:bg-[#121D2B]" aria-label="ایتا">
		<?php abbas_icon( 'message' ); ?>
		<span class="text-xs">ایتا</span>
	</a>
	<a href="<?php echo esc_url( $abbas_site['instagram'] ); ?>" target="_blank" rel="noopener noreferrer" class="flex min-h-[48px] flex-col items-center justify-center gap-0.5 py-2 text-text-secondary transition-colors active:bg-[#121D2B]" aria-label="اینستاگرام">
		<?php abbas_icon( 'instagram' ); ?>
		<span class="text-xs">اینستاگرام</span>
	</a>
</div>

<?php wp_footer(); ?>
</body>
</html>
