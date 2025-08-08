import type { Metadata } from 'next';
import GalleryGrid from '../../components/GalleryGrid';
import { withOg } from '../../lib/seo';
import { site } from '../../config/site';

export const metadata: Metadata = withOg(
  {
    title: `Gallery — ${site.name}`,
    description: 'Before and after highlights.',
  },
  '/og/gallery.txt'
);

const images = Array.from(
  { length: 9 },
  (_, i) => `/images/sample-${(i % 3) + 1}.jpg`
);

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-900">
        Gallery
      </h1>
      <p className="mt-2 text-zinc-700">A few recent projects. Tap to view.</p>

      <GalleryGrid images={images} />
    </div>
  );
}

// client-only lightbox is implemented in components/GalleryGrid
