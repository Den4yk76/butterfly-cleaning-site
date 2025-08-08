import type { Metadata } from 'next';
import { site } from '../../../config/site';
import { withOg } from '../../../lib/seo';
import { serviceJsonLd } from '../../../lib/schema';
import Link from 'next/link';

export const metadata: Metadata = withOg(
  {
    title: `Deep Cleaning — ${site.name}`,
    description:
      'Edges, corners, vents, switches, backsplash/grout; behind/under accessible furniture; high-touch points.',
  },
  '/og/services.txt'
);

export default function DeepCleaningPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-900">
        Deep Cleaning
      </h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4 text-zinc-700">
          <p>Ideal for seasonal refreshes or before special occasions.</p>
          <div>
            <h2 className="font-heading text-xl text-brand-900">
              What’s included
            </h2>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Edges, corners, vents, switches</li>
              <li>Backsplash and grout detail</li>
              <li>Behind/under accessible furniture</li>
              <li>High-touch points</li>
            </ul>
          </div>
          <p className="mt-4 text-zinc-800">
            We offer flat quotes or hourly billing. No strict minimum —
            preferred minimum booking is 3–4 hours.
          </p>
        </div>
        <aside className="space-y-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium h-11 px-6 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            {site.cta}
          </Link>
          <div className="text-sm text-zinc-700">
            Or call{' '}
            <a
              className="underline underline-offset-4"
              href={`tel:${site.phoneE164}`}
            >
              {site.phone}
            </a>
          </div>
        </aside>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              serviceType: 'Deep Cleaning',
              areaServed: 'York Region / GTA',
              providerName: site.name,
              description:
                'Edges, corners, vents, switches, backsplash/grout; behind/under accessible furniture; high-touch points.',
            })
          ),
        }}
      />
    </div>
  );
}
