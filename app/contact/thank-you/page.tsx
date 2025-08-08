import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '../../../config/site';

export const metadata: Metadata = {
  title: `Thank you — ${site.name}`,
  description: 'We received your request and will get back to you soon.',
};

export default function ThankYouPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-900">Thank you!</h1>
      <p className="mt-2 text-zinc-700">
        We received your request and will get back to you soon. If it’s urgent, call us at{' '}
        <a className="underline underline-offset-4" href={`tel:${site.phoneE164}`}>{site.phone}</a>.
      </p>
      <div className="mt-6">
        <Link href="/" className="text-brand-700 hover:text-brand-800 underline underline-offset-4">
          Return home
        </Link>
      </div>
    </div>
  );
}


