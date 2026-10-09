<?php
/**
 * Abbas Bazian theme functions.
 *
 * @package abbas-bazian
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'ABBAS_VERSION', '1.0.0' );

/* -------------------------------------------------------------------------
 * Setup
 * ---------------------------------------------------------------------- */

/**
 * Basic theme supports.
 */
function abbas_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script' ) );
}
add_action( 'after_setup_theme', 'abbas_setup' );

/**
 * Styles and scripts.
 */
function abbas_assets() {
	$uri = get_template_directory_uri();

	wp_enqueue_style(
		'abbas-fonts',
		'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&display=swap',
		array(),
		null
	);
	wp_enqueue_style( 'abbas-tailwind', $uri . '/assets/css/tailwind.css', array(), ABBAS_VERSION );
	wp_enqueue_style( 'abbas-theme', $uri . '/assets/css/theme.css', array( 'abbas-tailwind' ), ABBAS_VERSION );
	wp_enqueue_style( 'abbas-style', get_stylesheet_uri(), array( 'abbas-theme' ), ABBAS_VERSION );

	wp_enqueue_script( 'abbas-main', $uri . '/assets/js/main.js', array(), ABBAS_VERSION, true );

	if ( is_front_page() ) {
		wp_enqueue_script( 'abbas-hero-scrub', $uri . '/assets/js/hero-scrub.js', array(), ABBAS_VERSION, true );
	}
}
add_action( 'wp_enqueue_scripts', 'abbas_assets' );

/* -------------------------------------------------------------------------
 * Content
 *
 * Every string below is filterable, so the site owner can change copy
 * without touching the templates:
 *   add_filter( 'abbas_site', fn( $site ) => array_merge( $site, array( 'phone' => '...' ) ) );
 * ---------------------------------------------------------------------- */

/**
 * Site-wide contact details and links.
 *
 * @return array<string, string>
 */
function abbas_site() {
	return apply_filters(
		'abbas_site',
		array(
			'name'        => 'عباس بازیان',
			'description' => 'طراحی سایت وردپرس و المنتور، سریع و سئو محور.',
			'phone'       => '09114753055',
			'phone_link'  => 'tel:+989114753055',
			'email'       => 'abass.khamosh@gmail.com',
			'email_link'  => 'mailto:abass.khamosh@gmail.com',
			'eitaa'       => 'https://eitaa.com/Bazianwb',
			'telegram'    => 'https://t.me/Abasswordpress',
			'instagram'   => 'https://www.instagram.com/abbaswordparess/',
			'location'    => 'جویبار، مازندران',
		)
	);
}

/**
 * Primary navigation.
 *
 * @return array<int, array<string, string>>
 */
function abbas_nav_links() {
	return apply_filters(
		'abbas_nav_links',
		array(
			array(
				'label' => 'خانه',
				'path'  => '/',
			),
			array(
				'label' => 'درباره من',
				'path'  => '/about/',
			),
			array(
				'label' => 'خدمات',
				'path'  => '/offer/',
			),
			array(
				'label' => 'نمونه‌کار',
				'path'  => '/case-study/',
			),
			array(
				'label' => 'بلاگ',
				'path'  => '/blog/',
			),
			array(
				'label' => 'تماس',
				'path'  => '/contact/',
			),
		)
	);
}

/**
 * Footer quick links.
 *
 * @return array<int, array<string, string>>
 */
function abbas_footer_links() {
	return apply_filters(
		'abbas_footer_links',
		array(
			array(
				'label' => 'خانه',
				'path'  => '/',
			),
			array(
				'label' => 'درباره من',
				'path'  => '/about/',
			),
			array(
				'label' => 'خدمات',
				'path'  => '/offer/',
			),
			array(
				'label' => 'تماس',
				'path'  => '/contact/',
			),
		)
	);
}

/**
 * Legal links.
 *
 * @return array<int, array<string, string>>
 */
function abbas_legal_links() {
	return apply_filters(
		'abbas_legal_links',
		array(
			array(
				'label' => 'حریم خصوصی',
				'path'  => '/privacy/',
			),
			array(
				'label' => 'قوانین و مقررات',
				'path'  => '/terms-conditions/',
			),
		)
	);
}

/**
 * Services shown on the homepage.
 *
 * @return array<int, array<string, string>>
 */
function abbas_services() {
	return apply_filters(
		'abbas_services',
		array(
			array(
				'number'      => '01',
				'title'       => 'طراحی سایت وردپرس',
				'description' => 'طراحی سایت‌های شرکتی، فروشگاهی و شخصی با وردپرس با توجه به سئو، سرعت و تجربه کاربری.',
				'path'        => '/offer/',
			),
			array(
				'number'      => '02',
				'title'       => 'توسعه با المنتور',
				'description' => 'پیاده‌سازی حرفه‌ای صفحات با المنتور با تمرکز بر قابلیت اطمینان و نگهداری آسان.',
				'path'        => '/offer/',
			),
			array(
				'number'      => '03',
				'title'       => 'بهینه‌سازی سئو',
				'description' => 'بهبودهای سئوی فنی و محتوایی برای پشتیبانی از دیده‌شدن بهتر در نتایج جستجو.',
				'path'        => '/offer/',
			),
			array(
				'number'      => '04',
				'title'       => 'افزایش سرعت سایت',
				'description' => 'بهینه‌سازی عملکرد برای بارگذاری سریع‌تر، از جمله در دستگاه‌های موبایل.',
				'path'        => '/offer/',
			),
		)
	);
}

/**
 * Portfolio items.
 *
 * @return array<int, array<string, string>>
 */
function abbas_projects() {
	return apply_filters(
		'abbas_projects',
		array(
			array(
				'title'    => 'فروشگاه نان رژیمی پروین اسدی',
				'image'    => 'https://abbas-wordpress.ir/wp-content/uploads/2026/08/f2cfb9a6-6079-4c51-bd82-eac01654779a.jpg',
				'category' => 'فروشگاه آنلاین',
				'path'     => '/case-study/',
			),
			array(
				'title'    => 'نیلوفر مجرد خطیر',
				'image'    => 'https://abbas-wordpress.ir/wp-content/uploads/2026/08/8b011174-7cdf-4be0-927d-f63f753cb488.jpg',
				'category' => 'وب‌سایت',
				'path'     => '/case-study/',
			),
			array(
				'title'    => 'سایت شرکتی',
				'image'    => 'https://abbas-wordpress.ir/wp-content/uploads/2026/08/4909cdd3-0dd3-45aa-8922-0c82fb93fa1a.png',
				'category' => 'شرکتی',
				'path'     => '/case-study/',
			),
		)
	);
}

/**
 * Blog posts featured on the homepage.
 *
 * @return array<int, array<string, string>>
 */
function abbas_posts() {
	return apply_filters(
		'abbas_posts',
		array(
			array(
				'title' => '۷ دلیل کند بودن سایت روی موبایل',
				'image' => 'https://abbas-wordpress.ir/wp-content/uploads/2026/08/ccd98738-bd66-44aa-bc74-d5e5b41e6aa3.png',
				'path'  => '/blog/',
			),
			array(
				'title' => 'وردپرس یا Wix؟',
				'image' => 'https://abbas-wordpress.ir/wp-content/uploads/2026/08/3cce2c58-38f3-4582-9bc8-b5c1114898c4.png',
				'path'  => '/blog/',
			),
			array(
				'title' => 'راه‌اندازی فروشگاه با ووکامرس',
				'image' => 'https://abbas-wordpress.ir/wp-content/uploads/2026/08/d46fa32d-45f9-406e-a8b1-6d1b40f13705.png',
				'path'  => '/blog/',
			),
		)
	);
}

/**
 * FAQ entries.
 *
 * @return array<int, array<string, string>>
 */
function abbas_faqs() {
	return apply_filters(
		'abbas_faqs',
		array(
			array(
				'question' => 'هزینه طراحی سایت چقدر است؟',
				'answer'   => 'هزینه طراحی سایت بستگی به امکانات مورد نیاز، تعداد صفحات و اینکه آیا قابلیت فروشگاهی نیاز است یا خیر دارد. برای دریافت برآورد هزینه، با عباس تماس بگیرید.',
			),
			array(
				'question' => 'طراحی سایت چقدر زمان می‌برد؟',
				'answer'   => 'معمولاً بین ۷ تا ۲۱ روز، بسته به گستره پروژه زمان متفاوت است.',
			),
			array(
				'question' => 'آیا سایت روی موبایل بهینه است؟',
				'answer'   => 'بله، پروژه‌ها به صورت واکنش‌گرا و با رویکرد موبایل-اول طراحی می‌شوند.',
			),
		)
	);
}

/**
 * About-page facts.
 *
 * @return array<int, string>
 */
function abbas_facts() {
	return apply_filters(
		'abbas_facts',
		array(
			'۲ سال تجربه حرفه‌ای در وردپرس و المنتور',
			'تخصص در ووکامرس و فروشگاه‌های اینترنتی',
			'تحویل پروژه با سرعت و پشتیبانی واقعی',
		)
	);
}

/**
 * Skills listed on the about page.
 *
 * @return array<int, string>
 */
function abbas_skills() {
	return apply_filters(
		'abbas_skills',
		array(
			'طراحی سایت وردپرس',
			'توسعه با المنتور',
			'راه‌اندازی فروشگاه ووکامرس',
			'بهینه‌سازی سئو',
			'افزایش سرعت سایت',
			'پشتیبانی و نگهداری',
		)
	);
}

/**
 * Bullet points for each service on the services page, keyed by service title.
 *
 * @return array<string, array<int, string>>
 */
function abbas_service_details() {
	return apply_filters(
		'abbas_service_details',
		array(
			'طراحی سایت وردپرس' => array(
				'طراحی سایت‌های شرکتی، فروشگاهی و شخصی',
				'سازگار با سئو و سرعت بالا',
				'طراحی واکنش‌گرا برای موبایل و دسکتاپ',
			),
			'توسعه با المنتور'  => array(
				'پیاده‌سازی حرفه‌ای صفحات با المنتور',
				'کد تمیز و قابل نگهداری',
				'انیمیشن‌ها و تعامل‌های ظریف',
			),
			'بهینه‌سازی سئو'    => array(
				'سئوی فنی و ساختاری',
				'بهینه‌سازی محتوا و کلمات کلیدی',
				'پشتیبانی از افزونه‌های سئو',
			),
			'افزایش سرعت سایت'  => array(
				'بهینه‌سازی بارگذاری صفحات',
				'بهبود عملکرد روی موبایل',
				'کاهش حجم و درخواست‌های اضافی',
			),
		)
	);
}

/**
 * Business hours shown on the contact page.
 *
 * @return array<int, array<string, string>>
 */
function abbas_business_hours() {
	return apply_filters(
		'abbas_business_hours',
		array(
			array(
				'day'   => 'شنبه تا چهارشنبه',
				'hours' => '۹:۰۰ تا ۱۸:۰۰',
			),
			array(
				'day'   => 'پنجشنبه',
				'hours' => '۹:۰۰ تا ۱۴:۰۰',
			),
			array(
				'day'   => 'جمعه',
				'hours' => 'تعطیل',
			),
		)
	);
}

/**
 * Google Maps embed URL used on the contact page.
 *
 * @return string
 */
function abbas_maps_embed() {
	return apply_filters( 'abbas_maps_embed', 'https://www.google.com/maps?q=Joybar,Mazandaran,Iran&output=embed' );
}

/**
 * Curated blog cards normalised to { title, url, image }.
 *
 * @return array<int, array<string, string>>
 */
function abbas_post_items() {
	$items = array();

	foreach ( abbas_posts() as $abbas_post ) {
		$items[] = array(
			'title' => $abbas_post['title'],
			'url'   => home_url( $abbas_post['path'] ),
			'image' => $abbas_post['image'],
		);
	}

	return $items;
}

/**
 * Hero background image (also the fallback when the video cannot load).
 *
 * @return string
 */
function abbas_hero_image() {
	return apply_filters( 'abbas_hero_image', 'https://abbas-wordpress.ir/wp-content/uploads/2026/05/asly.png' );
}

/**
 * About section image.
 *
 * @return string
 */
function abbas_about_image() {
	return apply_filters( 'abbas_about_image', 'https://abbas-wordpress.ir/wp-content/uploads/2026/05/1766750916121.png' );
}

/* -------------------------------------------------------------------------
 * Helpers
 * ---------------------------------------------------------------------- */

/**
 * Inline SVG icon (lucide paths, 24x24, stroked).
 *
 * @param string $name  Icon key.
 * @param string $class CSS classes for the svg element.
 */
function abbas_icon( $name, $class = 'h-5 w-5' ) {
	$icons = array(
		'message'    => '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
		'eye'        => '<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/>',
		'clock'      => '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
		'check'      => '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
		'arrow-left' => '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
		'chevron'    => '<path d="m6 9 6 6 6-6"/>',
		'phone'      => '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
		'mail'       => '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
		'map-pin'    => '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
		'send'       => '<path d="M14.54 21.69a.5.5 0 0 0 .93-.03l6.5-19a.5.5 0 0 0-.63-.63l-19 6.5a.5.5 0 0 0-.03.93l7.93 3.18a2 2 0 0 1 1.11 1.11z"/><path d="m21.85 2.15-10.94 10.94"/>',
		'instagram'  => '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
		'menu'       => '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
		'close'      => '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
	);

	if ( ! isset( $icons[ $name ] ) ) {
		return;
	}

	printf(
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="%s" aria-hidden="true" focusable="false">%s</svg>',
		esc_attr( $class ),
		$icons[ $name ] // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- static, hard-coded markup.
	);
}

/**
 * Whether a nav path is the page currently being viewed.
 *
 * @param string $path Path relative to the site root.
 * @return bool
 */
function abbas_is_current( $path ) {
	if ( '/' === $path ) {
		return is_front_page();
	}

	$request = isset( $_SERVER['REQUEST_URI'] ) ? wp_unslash( $_SERVER['REQUEST_URI'] ) : '';
	$current = trailingslashit( (string) wp_parse_url( $request, PHP_URL_PATH ) );
	$target  = trailingslashit( (string) wp_parse_url( home_url( $path ), PHP_URL_PATH ) );

	return $current === $target;
}
