<?php
/**
 * Site header.
 *
 * @package abbas-bazian
 */

$abbas_site = abbas_site();
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header id="site-header" class="sticky top-0 z-50 border-b border-transparent bg-[#0B1420] transition-colors duration-300">
	<div class="container-page">
		<nav class="flex h-16 items-center justify-between">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="text-lg font-bold text-text-primary transition-colors hover:text-brand-blue">
				<?php echo esc_html( $abbas_site['name'] ); ?>
			</a>

			<ul class="hidden items-center gap-1 md:flex">
				<?php foreach ( abbas_nav_links() as $abbas_link ) : ?>
					<?php $abbas_active = abbas_is_current( $abbas_link['path'] ); ?>
					<li>
						<a
							href="<?php echo esc_url( home_url( $abbas_link['path'] ) ); ?>"
							class="rounded-lg px-3 py-2 text-sm font-medium transition-colors <?php echo $abbas_active ? 'text-brand-blue' : 'text-text-secondary hover:text-text-primary'; ?>"
							<?php echo $abbas_active ? 'aria-current="page"' : ''; ?>
						>
							<?php echo esc_html( $abbas_link['label'] ); ?>
						</a>
					</li>
				<?php endforeach; ?>
			</ul>

			<a href="<?php echo esc_url( $abbas_site['eitaa'] ); ?>" target="_blank" rel="noopener noreferrer" class="btn-primary hidden md:inline-flex">
				<?php abbas_icon( 'message', 'h-4 w-4' ); ?>
				مشاوره رایگان
			</a>

			<button
				type="button"
				id="menu-toggle"
				class="rounded-lg p-2 text-text-primary transition-colors hover:bg-[#121D2B] md:hidden"
				aria-label="باز کردن منو"
				aria-expanded="false"
				aria-controls="mobile-menu"
			>
				<span id="menu-icon-open" class="block"><?php abbas_icon( 'menu', 'h-6 w-6' ); ?></span>
				<span id="menu-icon-close" class="hidden"><?php abbas_icon( 'close', 'h-6 w-6' ); ?></span>
			</button>
		</nav>
	</div>

	<div id="mobile-menu" class="fixed inset-0 top-16 z-40 hidden bg-[#0B1420] md:hidden">
		<div class="container-page flex flex-col gap-1 pt-6">
			<?php foreach ( abbas_nav_links() as $abbas_link ) : ?>
				<?php $abbas_active = abbas_is_current( $abbas_link['path'] ); ?>
				<a
					href="<?php echo esc_url( home_url( $abbas_link['path'] ) ); ?>"
					class="rounded-lg px-4 py-3 text-base font-medium transition-colors <?php echo $abbas_active ? 'bg-[#121D2B] text-brand-blue' : 'text-text-secondary hover:bg-[#121D2B] hover:text-text-primary'; ?>"
					<?php echo $abbas_active ? 'aria-current="page"' : ''; ?>
				>
					<?php echo esc_html( $abbas_link['label'] ); ?>
				</a>
			<?php endforeach; ?>

			<a href="<?php echo esc_url( $abbas_site['eitaa'] ); ?>" target="_blank" rel="noopener noreferrer" class="btn-primary mt-4 w-full">
				<?php abbas_icon( 'message', 'h-4 w-4' ); ?>
				مشاوره رایگان
			</a>
		</div>
	</div>
</header>

<main class="min-h-screen pb-16 md:pb-0">
