import type { Metadata } from 'next';
import { site } from '../../config/site';
import { ContactForm } from '../../components/ContactForm';

export const metadata: Metadata = {
  title: `Contact — ${site.name}`,
  description:
    'Tell us about your place and preferred date/time — we’ll reply quickly to confirm details and provide a quote.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-900">Contact</h1>
      <p className="mt-2 text-zinc-700">
        Tell us about your place and preferred date/time — we’ll reply quickly to confirm details and provide a quote.
      </p>
      <div className="mt-8">
        {/* Cloudflare Turnstile token will be posted as turnstileToken via hidden input; widget wired later */}
        <ContactForm />
      </div>
    </div>
  );
}


