import type { Metadata } from 'next';
import { site } from '../../config/site';
import { ContactForm } from '../../components/ContactForm';
import { withOg } from '../../lib/seo';
import { faqJsonLd } from '../../lib/schema';

export const metadata: Metadata = withOg(
  {
    title: `Contact — ${site.name}`,
    description:
      'Tell us about your place and preferred date/time — we’ll reply quickly to confirm details and provide a quote.',
  },
  '/og/contact.txt'
);

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-900">
        Contact
      </h1>
      <p className="mt-2 text-zinc-700">
        Tell us about your place and preferred date/time — we’ll reply quickly
        to confirm details and provide a quote.
      </p>
      <div className="mt-8">
        <ContactForm siteKey={process.env.TURNSTILE_SITE_KEY ?? ''} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqJsonLd({
              qa: [
                {
                  q: 'Do you have a minimum?',
                  a: 'No strict minimum — preferred minimum booking is 3–4 hours.',
                },
                {
                  q: 'Do you bring supplies?',
                  a: 'Yes, we bring standard supplies and tools.',
                },
              ],
            })
          ),
        }}
      />
    </div>
  );
}
