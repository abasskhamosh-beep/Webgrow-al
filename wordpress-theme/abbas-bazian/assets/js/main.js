/**
 * Site chrome: sticky header state, mobile menu, FAQ accordion.
 *
 * The Tailwind class names toggled below are written as literals on purpose —
 * they are what the Tailwind content scanner picks up when the CSS bundle is
 * built, so keep them spelled out rather than assembled from variables.
 */
(function () {
	'use strict';

	function initHeader() {
		var header = document.getElementById('site-header');
		if (!header) {
			return;
		}

		var onScroll = function () {
			var scrolled = window.scrollY > 8;
			header.classList.toggle('border-[#1E2A3A]', scrolled);
			header.classList.toggle('bg-[#0B1420]/90', scrolled);
			header.classList.toggle('backdrop-blur-md', scrolled);
			header.classList.toggle('border-transparent', !scrolled);
			header.classList.toggle('bg-[#0B1420]', !scrolled);
		};

		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
	}

	function initMobileMenu() {
		var toggle = document.getElementById('menu-toggle');
		var panel = document.getElementById('mobile-menu');
		var iconOpen = document.getElementById('menu-icon-open');
		var iconClose = document.getElementById('menu-icon-close');
		if (!toggle || !panel) {
			return;
		}

		var setOpen = function (open) {
			panel.classList.toggle('hidden', !open);
			toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
			toggle.setAttribute('aria-label', open ? 'بستن منو' : 'باز کردن منو');
			document.body.style.overflow = open ? 'hidden' : '';
			if (iconOpen) {
				iconOpen.classList.toggle('hidden', open);
			}
			if (iconClose) {
				iconClose.classList.toggle('hidden', !open);
			}
		};

		toggle.addEventListener('click', function () {
			setOpen(toggle.getAttribute('aria-expanded') !== 'true');
		});

		Array.prototype.forEach.call(panel.querySelectorAll('a'), function (link) {
			link.addEventListener('click', function () {
				setOpen(false);
			});
		});
	}

	function initFaq() {
		var items = document.querySelectorAll('[data-faq]');
		if (!items.length) {
			return;
		}

		var setState = function (item, open) {
			var button = item.querySelector('[data-faq-toggle]');
			var panel = item.querySelector('[data-faq-panel]');
			var chevron = item.querySelector('[data-faq-chevron]');
			if (!button || !panel) {
				return;
			}

			button.setAttribute('aria-expanded', open ? 'true' : 'false');
			panel.classList.toggle('grid-rows-[1fr]', open);
			panel.classList.toggle('opacity-100', open);
			panel.classList.toggle('grid-rows-[0fr]', !open);
			panel.classList.toggle('opacity-0', !open);
			if (chevron) {
				chevron.classList.toggle('rotate-180', open);
			}
		};

		Array.prototype.forEach.call(items, function (item) {
			var button = item.querySelector('[data-faq-toggle]');
			if (!button) {
				return;
			}

			button.addEventListener('click', function () {
				var willOpen = button.getAttribute('aria-expanded') !== 'true';
				Array.prototype.forEach.call(items, function (other) {
					setState(other, other === item && willOpen);
				});
			});
		});
	}

	function init() {
		initHeader();
		initMobileMenu();
		initFaq();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
