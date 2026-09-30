"use client";

import { useState } from "react";
import { LogoMark } from "./Logo";

// Simple image component that handles load errors gracefully with a branded fallback
export default function SmartImage({ src, alt, className = "", priority = false, ...rest }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`grid place-items-center bg-gray-100 text-amber-500/60 ${className}`}
      >
        <LogoMark className="h-1/3 w-1/3 max-h-14 max-w-14" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
      {...rest}
    />
  );
}
