"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Eye, Clock, CheckCircle2 } from "lucide-react";
import {
  siteConfig,
  heroImage,
  heroVideoDesktop,
  heroVideoMobile,
} from "@/lib/data";
import { useScrollScrubVideo } from "@/lib/useScrollScrubVideo";

const trustBadges = [
  { icon: Clock, label: "۲ سال تجربه" },
  { icon: CheckCircle2, label: "+۲۰ پروژه موفق" },
  { icon: MessageCircle, label: "پاسخ زیر ۲۴ ساعت" },
];

/**
 * Scroll-driven hero.
 *
 * The video is never played — it is *scrubbed*. The hero owns a tall scroll
 * range (see below), the viewport inside it is pinned with `position: sticky`,
 * and scroll progress through that range is mapped 1:1 onto the video
 * timeline by `useScrollScrubVideo`.
 *
 * Encoding note — why the video lives in `/public` instead of being streamed
 * from the original URL:
 *
 *   The supplied master (1920x1080, 16.5 Mb/s) carried a *single* keyframe for
 *   its whole 5s runtime. Scrubbing it means the decoder has to walk forward
 *   from frame 0 on every seek, which is exactly what produces stutter.
 *   Both files below were re-encoded as **all-intra H.264** (`-g 1`, no audio,
 *   `+faststart`), i.e. every frame is independently decodable, so a seek is
 *   O(1) regardless of direction. Sizes: ~2.9 MB desktop / ~1.3 MB mobile.
 *
 *   If the video is ever replaced, re-encode with:
 *     ffmpeg -i master.mp4 -an -vf "scale=1600:-2" -c:v libx264 -preset slow \
 *       -crf 28 -g 1 -keyint_min 1 -sc_threshold 0 -pix_fmt yuv420p \
 *       -movflags +faststart hero-scrub-desktop.mp4
 *   Frequent keyframes (a small GOP is enough — all-intra is the safest),
 *   a modest resolution/bitrate, and no audio track are what keep scrubbing
 *   smooth. A WebM variant was deliberately skipped: the all-intra MP4 is
 *   already small and plays in every browser that could use a WebM, so a
 *   second encode would only duplicate bytes.
 */

/** Scroll budget in vh. The pinned viewport adds another 100vh on top. */
const MIN_SCROLL_VH = 200;
const MAX_SCROLL_VH = 400;
const VH_PER_VIDEO_SECOND = 40;

/** Copy is fully faded out by this point of the scroll progress. */
const COPY_FADE_END = 0.35;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // Runs once after hydration: picks a lighter encode on small screens and
  // opts out of the whole experience when the user prefers reduced motion.
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = (matches: boolean) => {
      setReducedMotion(matches);
      if (!matches) {
        const isSmall = window.matchMedia("(max-width: 767px)").matches;
        setVideoSrc(isSmall ? heroVideoMobile : heroVideoDesktop);
      }
    };

    sync(motionQuery.matches);
    const onChange = (event: MediaQueryListEvent) => sync(event.matches);
    motionQuery.addEventListener("change", onChange);
    return () => motionQuery.removeEventListener("change", onChange);
  }, []);

  // Written straight to the DOM inside the animation frame — deliberately not
  // React state, so scrolling never re-renders the hero.
  const handleProgress = useCallback((progress: number) => {
    const el = copyRef.current;
    if (!el) return;
    const fade = 1 - Math.min(progress / COPY_FADE_END, 1);
    el.style.opacity = fade.toFixed(3);
    el.style.transform = `translate3d(0, ${(-progress * 56).toFixed(1)}px, 0)`;
    el.style.pointerEvents = fade < 0.05 ? "none" : "";
  }, []);

  const scrubEnabled = Boolean(videoSrc) && !reducedMotion;
  const { status, duration } = useScrollScrubVideo({
    sectionRef,
    stickyRef,
    videoRef,
    enabled: scrubEnabled,
    onProgress: handleProgress,
  });

  const scrollVh = duration
    ? Math.min(
        MAX_SCROLL_VH,
        Math.max(MIN_SCROLL_VH, Math.round(duration * VH_PER_VIDEO_SECOND)),
      )
    : MIN_SCROLL_VH;

  return (
    <section
      ref={sectionRef}
      className="relative border-b border-[#1E2A3A]"
      style={reducedMotion ? undefined : { height: `calc(100vh + ${scrollVh}vh)` }}
    >
      <div
        ref={stickyRef}
        className={`${reducedMotion ? "relative" : "sticky top-0"} h-screen w-full overflow-hidden`}
      >
        {/* Base layer — the previous hero image. Doubles as the fallback if
            the video fails to load, so the hero is never blank. */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {scrubEnabled && (
          <video
            ref={videoRef}
            src={videoSrc ?? undefined}
            preload="auto"
            muted
            playsInline
            disablePictureInPicture
            tabIndex={-1}
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
              status === "ready" ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Deliberately light scrim — just enough for the copy to stay legible. */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0B1420]/80 via-[#0B1420]/15 to-[#0B1420]/40"
          aria-hidden="true"
        />

        <div className="container-page relative z-20 flex h-full items-center">
          <div
            ref={copyRef}
            className="max-w-2xl text-center will-change-transform lg:text-right"
            style={{ textShadow: "0 2px 24px rgba(11, 20, 32, 0.7)" }}
          >
            <span className="inline-block rounded-full border border-brand-blue/30 bg-brand-blue/5 px-4 py-1.5 text-xs font-medium text-brand-blue">
              طراح سایت در مازندران
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-text-primary sm:text-4xl md:text-5xl">
              طراحی سایت وردپرس و فروشگاهی در مازندران
            </h1>

            <p className="mt-5 text-base leading-relaxed text-text-secondary sm:text-lg">
              طراحی سایت حرفه‌ای با وردپرس و المنتور؛ سریع، سئو محور و آماده برای
              تبدیل بازدیدکننده به مشتری.
            </p>

            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href={siteConfig.eitaa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                مشاوره رایگان
              </a>
              <Link href="/case-study/" className="btn-secondary w-full sm:w-auto">
                <Eye className="h-4 w-4" />
                مشاهده نمونه‌کارها
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-sm text-text-secondary"
                >
                  <badge.icon className="h-4 w-4 text-brand-green" />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {scrubEnabled && status === "loading" && (
          <div className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex flex-col items-center gap-2">
            <div className="h-0.5 w-24 overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-brand-blue" />
            </div>
            <span className="text-[11px] text-white/60">
              در حال آماده‌سازی تجربه…
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
