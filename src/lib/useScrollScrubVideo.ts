"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export type ScrollVideoStatus = "loading" | "ready" | "error";

/* ------------------------------------------------------------------ *
 * Tuning
 * ------------------------------------------------------------------ */

/**
 * Catch-up rate of the rendered frame towards the scroll target.
 * Higher = snappier. ~14 keeps the video glued to the scroll with no
 * perceptible lag while still absorbing the jitter of a raw wheel/touch
 * event stream.
 */
const EASE_RATE = 14;

/** Stop easing once we are within this many seconds of the target. */
const SNAP_SECONDS = 0.004;

/**
 * Never write `currentTime` for a delta smaller than this. A seek is not
 * free, so this is what keeps a 60fps scroll from turning into a "seek
 * flood" of hundreds of redundant decoder commands per second.
 */
const SEEK_EPSILON = 0.006;

/** Cap the frame delta so a stalled/backgrounded tab cannot make easing jump. */
const MAX_FRAME_MS = 64;

function clamp01(value: number) {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

interface UseScrollScrubVideoOptions {
  /** Tall element that owns the scroll range. */
  sectionRef: RefObject<HTMLElement | null>;
  /** The pinned (`position: sticky`) viewport inside that section. */
  stickyRef: RefObject<HTMLElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  /** Skip all work (e.g. `prefers-reduced-motion`, or no video mounted yet). */
  enabled: boolean;
  /** Called from the animation frame with the raw 0..1 scroll progress. */
  onProgress?: (progress: number) => void;
}

/**
 * Maps scroll position onto a paused video's timeline.
 *
 * The video is *scrubbed*, never played: the scroll listener only records a
 * target progress, and a single `requestAnimationFrame` loop eases the real
 * `video.currentTime` towards it. No React state is touched while scrolling,
 * so nothing re-renders.
 */
export function useScrollScrubVideo({
  sectionRef,
  stickyRef,
  videoRef,
  enabled,
  onProgress,
}: UseScrollScrubVideoOptions) {
  const [status, setStatus] = useState<ScrollVideoStatus>("loading");
  const [duration, setDuration] = useState(0);

  const onProgressRef = useRef(onProgress);
  useEffect(() => {
    onProgressRef.current = onProgress;
  });

  useEffect(() => {
    if (!enabled) return;

    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const video = videoRef.current;
    if (!section || !sticky || !video) return;

    let target = 0; // 0..1 scroll progress
    let rendered = 0; // eased video time, in seconds
    let ready = false;
    let running = false;
    let lastFrame = 0;
    let rafId = 0;
    let reportedTarget = -1;

    /**
     * The scroll range is measured against the pinned viewport's own height
     * rather than `window.innerHeight`: `vh` and `innerHeight` disagree on
     * mobile while the browser chrome is showing, and this keeps 100% of the
     * scroll mapped to exactly 100% of the video.
     */
    const readProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - sticky.offsetHeight;
      target = scrollable > 0 ? clamp01(-rect.top / scrollable) : 0;
    };

    const frame = (now: number) => {
      const dt = Math.min(now - lastFrame, MAX_FRAME_MS);
      lastFrame = now;

      if (reportedTarget !== target) {
        reportedTarget = target;
        onProgressRef.current?.(target);
      }

      const videoDuration = video.duration;
      let settling = false;

      if (ready && Number.isFinite(videoDuration) && videoDuration > 0) {
        const targetTime = target * videoDuration;
        // Frame-rate independent exponential smoothing.
        const ease = 1 - Math.exp((-EASE_RATE * dt) / 1000);
        rendered += (targetTime - rendered) * ease;

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
    };

    const start = () => {
      if (running) return;
      running = true;
      lastFrame = performance.now();
      rafId = requestAnimationFrame(frame);
    };

    const syncNow = () => {
      readProgress();
      start();
    };

    const markReady = () => {
      if (ready) return;
      ready = true;
      setStatus("ready");
      readProgress();

      const videoDuration = video.duration;
      if (Number.isFinite(videoDuration) && videoDuration > 0) {
        rendered = target * videoDuration;
        // Snap to the frame matching the current scroll position, so a page
        // refreshed half-way through the hero resumes on the right frame
        // instead of easing up from 0.
        try {
          video.currentTime = rendered;
        } catch {
          /* Some browsers reject a seek before metadata is parsed. */
        }
      }
      start();
    };

    const handleMetadata = () => {
      if (Number.isFinite(video.duration)) setDuration(video.duration);
    };
    const handleError = () => setStatus("error");

    video.addEventListener("loadedmetadata", handleMetadata);
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);
    video.addEventListener("error", handleError);
    window.addEventListener("scroll", syncNow, { passive: true });
    window.addEventListener("resize", syncNow);

    // Catches the section height changing once the real duration is known.
    const resizeObserver = new ResizeObserver(syncNow);
    resizeObserver.observe(section);

    // The video may already be buffered from cache before we subscribed.
    if (video.readyState >= 1) handleMetadata();
    if (video.readyState >= 2) markReady();

    readProgress();
    onProgressRef.current?.(target);
    start();

    return () => {
      cancelAnimationFrame(rafId);
      running = false;
      video.removeEventListener("loadedmetadata", handleMetadata);
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("error", handleError);
      window.removeEventListener("scroll", syncNow);
      window.removeEventListener("resize", syncNow);
      resizeObserver.disconnect();
    };
  }, [enabled, sectionRef, stickyRef, videoRef]);

  return { status, duration };
}
