import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function ImageWithLoader({
  src,
  alt,
  className,
  containerClassName,
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setLoaded(false);
    // If the image is already cached (e.g. the same album art shown
    // elsewhere on the page), the browser can resolve it - and fire
    // "load" - before this effect attaches, so onLoad below never
    // sees it. Catch that case by checking .complete directly.
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div className={twMerge("relative bg-black/20 overflow-hidden", containerClassName)}>
      {!loaded && (
        <div className="absolute inset-0 flex justify-center items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white/70 animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 rounded-full bg-white/70 animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 rounded-full bg-white/70 animate-bounce" />
        </div>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={twMerge(
          "transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
      />
    </div>
  );
}
