import type { Metadata } from 'next';

export function withOg(metadata: Metadata, ogPath: string): Metadata {
  const base = metadata;
  const images = [{ url: ogPath }];
  return {
    ...base,
    openGraph: {
      ...(base.openGraph ?? {}),
      images,
    },
    twitter: {
      ...(base.twitter ?? {}),
      card: 'summary_large_image',
      images: images.map((i) => i.url),
    },
  };
}


