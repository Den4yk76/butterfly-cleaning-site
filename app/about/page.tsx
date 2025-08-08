import type { Metadata } from 'next';
import { site } from '../../config/site';

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description: `${site.name} is locally operated and detail‑oriented. Flexible scheduling and a Satisfaction Guarantee.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-900">About</h1>
      <div className="mt-6 space-y-4 text-zinc-700">
        <p>
          Family-run and owner-operated, we’re focused on quality and reliability. We pay attention to edges, corners and fixtures, and we stand by our work.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Satisfaction Guaranteed — if something’s not right, we’ll make it right.</li>
          <li>Flexible scheduling — one-time or recurring cleans.</li>
          <li>Locally operated in York Region / GTA.</li>
        </ul>
      </div>
    </div>
  );
}


