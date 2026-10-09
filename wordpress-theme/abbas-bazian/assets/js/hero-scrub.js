/**
 * Scroll-driven hero video — vanilla-JS port of src/lib/useScrollScrubVideo.ts.
 *
 * The video is never played. The hero owns a tall scroll range, the viewport
 * inside it is pinned with `position: sticky`, and scroll progress through that
 * range is mapped 1:1 onto `video.currentTime` inside a single
 * requestAnimationFrame loop. The scroll listener only records a target — the
 * actual seek happens in the frame loop, eased, so scrolling never floods the
 * decoder with redundant seeks.
 *
 * Encoding note: the bundled clips are all-intra H.264 (every frame a keyframe,
 * no audio track, `+faststart`). The original master carried a single keyframe
 * for its whole 5s runtime, which makes scrubbing stutter badly. To re-encode:
 *
 *   ffmpeg -i master.mp4 -an -vf "scale=1600:-2" -c:v libx264 -preset slow \
 *     -crf 28 -g 1 -keyint_min 1 -sc_threshold 0 -pix_fmt yuv420p \
 *     -movflags +faststart hero-scrub-desktop.mp4
 */
(function () {
	'use strict';

	/* Catch-up rate towards the scroll target. Higher = snappier. */
	var EASE_RATE = 14;
	/* Stop easing within this many seconds of the target. */
	var SNAP_SECONDS = 0.004;
	/* Never write currentTime for a delta smaller than this. */
	var SEEK_EPSILON = 0.006;
	/* Cap the frame delta so a stalled tab cannot make easing jump. */
	var MAX_FRAME_MS = 64;

	/* Copy is fully faded out by this point of the scroll progress. */
	var COPY_FADE_END = 0.35;

	/* Scroll budget in vh. The pinned viewport adds another 100vh on top. */
	var MIN_SCROLL_VH = 200;
	var MAX_SCROLL_VH = 400;
	var VH_PER_VIDEO_SECOND = 40;

	function clamp01(value) {
		return value < 0 ? 0 : value > 1 ? 1 : value;
	}

	function init() {
		var section = document.getElementById('hero');
		var pin = document.getElementById('hero-pin');
		var video = document.getElementById('hero-video');
		var copy = document.getElementById('hero-copy');
		var loader = document.getElementById('hero-loader');

		if (!section || !pin || !video) {
			return;
		}

		/* Reduced motion: leave the static frame and never fetch the video. */
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}

		var base = video.getAttribute('data-src-base');
		if (!base) {
			return;
		}

		var isSmall = window.matchMedia('(max-width: 767px)').matches;
		video.src = base + (isSmall ? 'hero-scrub-mobile.mp4' : 'hero-scrub-desktop.mp4');

		var target = 0;
		var rendered = 0;
		var ready = false;
		var running = false;
		var lastFrame = 0;
		var rafId = 0;
		var reported = -1;

		/* Measured against the pinned viewport's own height rather than
		   window.innerHeight: `vh` and innerHeight disagree on mobile while the
		   browser chrome is showing, and this keeps 100% of the scroll mapped to
		   exactly 100% of the video. */
		function readProgress() {
			var rect = section.getBoundingClientRect();
			var scrollable = rect.height - pin.offsetHeight;
			target = scrollable > 0 ? clamp01(-rect.top / scrollable) : 0;
		}

		function applyCopy(progress) {
			if (!copy) {
				return;
			}
			var fade = 1 - Math.min(progress / COPY_FADE_END, 1);
			copy.style.opacity = fade.toFixed(3);
			copy.style.transform = 'translate3d(0,' + (-progress * 56).toFixed(1) + 'px,0)';
			copy.style.pointerEvents = fade < 0.05 ? 'none' : '';
		}

		function frame(now) {
			var dt = Math.min(now - lastFrame, MAX_FRAME_MS);
			lastFrame = now;

			if (reported !== target) {
				reported = target;
				applyCopy(target);
			}

			var duration = video.duration;
			var settling = false;

			if (ready && isFinite(duration) && duration > 0) {
				var targetTime = target * duration;
				/* Frame-rate independent exponential smoothing. */
				rendered += (targetTime - rendered) * (1 - Math.exp((-EASE_RATE * dt) / 1000));

				if (Math.abs(targetTime - rendered) < SNAP_SECONDS) {
					rendered = targetTime;
				} else {
					settling = true;
				}

				if (Math.abs(video.currentTime - rendered) > SEEK_EPSILON) {
					video.currentTime = rendered;
				}
			}

			if (settling) {
				rafId = requestAnimationFrame(frame);
			} else {
				running = false;
			}
		}

		function start() {
			if (running) {
				return;
			}
			running = true;
			lastFrame = performance.now();
			rafId = requestAnimationFrame(frame);
		}

		function syncNow() {
			readProgress();
			start();
		}

		function setHeight(seconds) {
			var vh = Math.min(
				MAX_SCROLL_VH,
				Math.max(MIN_SCROLL_VH, Math.round(seconds * VH_PER_VIDEO_SECOND))
			);
			section.style.height = 'calc(100vh + ' + vh + 'vh)';
		}

		function markReady() {
			if (ready) {
				return;
			}
			ready = true;

			video.classList.remove('opacity-0');
			video.classList.add('opacity-100');
			if (loader) {
				loader.classList.add('hidden');
			}

			readProgress();
			var duration = video.duration;
			if (isFinite(duration) && duration > 0) {
				/* Snap to the frame matching the current scroll position, so a
				   page refreshed half-way through the hero resumes correctly. */
				rendered = target * duration;
				try {
					video.currentTime = rendered;
				} catch (error) {
					/* Some browsers reject a seek before metadata is parsed. */
				}
			}
			start();
		}

		video.addEventListener('loadedmetadata', function () {
			if (isFinite(video.duration)) {
				setHeight(video.duration);
			}
		});
		video.addEventListener('loadeddata', markReady);
		video.addEventListener('canplay', markReady);
		video.addEventListener('error', function () {
			/* The base image stays visible — the hero is never blank. */
			if (loader) {
				loader.classList.add('hidden');
			}
		});

		window.addEventListener('scroll', syncNow, { passive: true });
		window.addEventListener('resize', syncNow);

		if (window.ResizeObserver) {
			new window.ResizeObserver(syncNow).observe(section);
		}

		/* The video may already be buffered from cache before we subscribed. */
		if (video.readyState >= 1 && isFinite(video.duration)) {
			setHeight(video.duration);
		}
		if (video.readyState >= 2) {
			markReady();
		}

		readProgress();
		applyCopy(target);
		start();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
