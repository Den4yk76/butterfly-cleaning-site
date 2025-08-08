import type { Metadata } from 'next';
import { site } from '../../config/site';

export const metadata: Metadata = {
  title: `Terms — ${site.name}`,
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-900">Terms</h1>
      <p className="mt-4 text-zinc-700">
        By using this website you agree to reasonable use and to provide accurate contact details when submitting a quote request.
      </p>
    </div>
  );
}


