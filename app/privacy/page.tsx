import type { Metadata } from 'next';
import { site } from '../../config/site';

export const metadata: Metadata = {
  title: `Privacy — ${site.name}`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-900">Privacy Policy</h1>
      <p className="mt-4 text-zinc-700">
        We respect your privacy. Information submitted via our contact form is used only to respond to your request. We do not sell your data.
      </p>
    </div>
  );
}


