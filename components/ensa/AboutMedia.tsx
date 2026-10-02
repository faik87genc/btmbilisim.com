"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

/**
 * The AboutTeaser visual — a looping background video with the same
 * poster-first pattern as the hero (see HeroSlider): the static `image`
 * is what actually paints first and what "hareketi azalt" visitors get,
 * the video plays on top once it's ready.
 */
// false during SSR and hydration, true afterwards (no effect, no extra render pass).
const noopSubscribe = () => () => {};

export function AboutMedia({
  video,
  image,
  alt,
}: {
  video: string;
  image: string;
  alt: string;
}) {
  const reduceMotion = useReducedMotion();
  // On the client useReducedMotion() already knows the answer during the
  // hydration render, while the server rendered the image — swap to the
  // video only after mount so both renders match.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  // `reduceMotion === false` (not the inverse) is deliberate: this hook
  // returns `null` during SSR (matchMedia needs the browser), and treating
  // "unknown yet" as "safe to autoplay" would ship an autoplaying <video> in
  // the server-rendered HTML for reduced-motion visitors too, until React
  // hydrates and corrects it. Defaulting to the static image until hydration
  // explicitly confirms no reduced-motion preference is the only server-safe
  // choice.
  if (!mounted || reduceMotion !== false) {
    return (
      <Image
        src={image}
        alt={alt}
        width={1600}
        height={754}
        loading="lazy"
        quality={70}
        sizes="(min-width: 1024px) 40vw, (min-width: 768px) 28rem, 90vw"
        className="h-72 w-full object-cover md:h-96"
      />
    );
  }

  return (
    <video
      className="h-72 w-full object-cover md:h-96"
      poster={image}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
    >
      <source src={video} type="video/mp4" />
    </video>
  );
}
