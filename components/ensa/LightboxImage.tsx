"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "./Lightbox";

export function LightboxImage({
  src,
  alt,
  width,
  height,
  className = "",
  imgClassName = "h-auto w-full",
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`block w-full cursor-zoom-in ${className}`}
        aria-label={`${alt} — büyüt`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={imgClassName}
        />
      </button>

      <Lightbox
        images={[{ src, alt, width, height }]}
        index={0}
        onIndexChange={() => {}}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
