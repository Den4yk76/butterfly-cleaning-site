"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type GalleryGridProps = {
  images: string[];
};

export function GalleryGrid({ images }: GalleryGridProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        d.close();
        setActiveSrc(null);
      }
    };
    d.addEventListener('keydown', onKey);
    return () => d.removeEventListener('keydown', onKey);
  }, []);

  function open(src: string) {
    setActiveSrc(src);
    const d = dialogRef.current;
    if (d && !d.open) d.showModal();
  }

  function close() {
    const d = dialogRef.current;
    if (d && d.open) d.close();
    setActiveSrc(null);
  }

  return (
    <>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((src, idx) => (
          <button
            key={idx}
            className="group relative aspect-square overflow-hidden rounded-xl border border-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            aria-label="Open image"
            onClick={() => open(src)}
          >
            <Image src={src} alt="Gallery image" fill sizes="(min-width: 640px) 33vw, 50vw" className="object-cover group-hover:opacity-95" />
          </button>
        ))}
      </div>

      <dialog ref={dialogRef} className="backdrop:bg-black/70 p-0 rounded-xl overflow-hidden">
        <div className="relative w-[90vw] max-w-3xl h-[60vh]">
          {activeSrc ? (
            <Image src={activeSrc} alt="Selected" fill sizes="90vw" className="object-contain bg-black" />
          ) : null}
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-2 top-2 rounded bg-black/60 text-white px-2 py-1 text-sm"
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}

export default GalleryGrid;


