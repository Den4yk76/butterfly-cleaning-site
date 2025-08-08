import type { Metadata } from 'next';
import { site } from '../../config/site';
import { ServiceCards } from '../../components/ServiceCards';
import { withOg } from '../../lib/seo';

export const metadata: Metadata = withOg(
  {
    title: `Services — ${site.name}`,
    description:
      'Residential, Commercial/Office, Deep Cleaning, Move-In/Move-Out, Window Cleaning.',
  },
  '/og/services.txt'
);

const services = [
  { title: 'Residential Cleaning', href: '/services/residential-cleaning' },
  { title: 'Commercial Cleaning', href: '/services/commercial-cleaning' },
  { title: 'Deep Cleaning', href: '/services/deep-cleaning' },
  {
    title: 'Move-In/Move-Out Cleaning',
    href: '/services/move-in-move-out-cleaning',
  },
  { title: 'Window Cleaning', href: '/services/window-cleaning' },
];

export default function ServicesIndexPage() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-900">
          Services
        </h1>
        <p className="mt-2 text-zinc-700">
          We offer flat quotes or hourly billing. No strict minimum — preferred
          minimum booking is 3–4 hours.
        </p>
      </div>
      <ServiceCards items={services} />
    </div>
  );
}
