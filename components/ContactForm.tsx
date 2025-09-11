'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { site } from '../config/site';

type Props = { siteKey: string };

export function ContactForm({ siteKey }: Props) {
  const [moreDetails, setMoreDetails] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const router = useRouter();

  // Register a global callback for Turnstile to call when token is ready
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-expect-error attach global for Turnstile data-callback
      window.onTurnstileSuccess = (token: string) => {
        setTurnstileToken(token);
      };
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Normalize multi-select into comma-separated string expected by API
    const services = Array.from(
      form.querySelectorAll<HTMLSelectElement>('#services option:checked')
    ).map((o) => o.value);
    fd.set('services', services.join(','));

    // Add Turnstile token to form data (required in prod)
    const headers: HeadersInit = {};
    if (turnstileToken) {
      fd.set('turnstileToken', turnstileToken);
      // Also send as cf-turnstile-response header (standard Turnstile behavior)
      headers['cf-turnstile-response'] = turnstileToken;
    }

    const res = await fetch('/api/contact', { 
      method: 'POST', 
      body: fd,
      headers 
    });
    setSubmitting(false);
    if (res.ok) {
      router.push('/contact/thank-you');
    } else {
      const data = await res.json().catch(() => ({}));
      const errorMessage = data?.error || 'Something went wrong. Please try again or call us at (647) 327-5163.';
      setError(errorMessage);
    }
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-800"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            type="text"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-zinc-800"
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            required
            type="tel"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-800"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            required
            type="email"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          />
        </div>
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-zinc-800"
          >
            City
          </label>
          <select
            id="city"
            name="city"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <option value="">Select city…</option>
            {site.areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="services"
            className="block text-sm font-medium text-zinc-800"
          >
            Services
          </label>
          <select
            id="services"
            name="services"
            multiple
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial/Office</option>
            <option value="deep">Deep</option>
            <option value="move">Move-In/Move-Out</option>
            <option value="windows">Windows</option>
          </select>
          <p className="mt-1 text-xs text-zinc-600">
            Hold Command/Ctrl to select multiple.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="preferredDate"
              className="block text-sm font-medium text-zinc-800"
            >
              Preferred date
            </label>
            <input
              id="preferredDate"
              name="preferredDate"
              type="date"
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            />
          </div>
          <div>
            <label
              htmlFor="preferredTime"
              className="block text-sm font-medium text-zinc-800"
            >
              Preferred time
            </label>
            <select
              id="preferredTime"
              name="preferredTime"
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            >
              <option value="">Select…</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="recurring"
            className="block text-sm font-medium text-zinc-800"
          >
            Recurring
          </label>
          <select
            id="recurring"
            name="recurring"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <option value="one-time">One-time</option>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-zinc-800"
          >
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          />
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setMoreDetails((v) => !v)}
          className="text-sm text-brand-700 hover:text-brand-800 underline underline-offset-4"
          aria-expanded={moreDetails}
        >
          {moreDetails ? 'Hide details' : 'More details'}
        </button>
        {moreDetails && (
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label
                htmlFor="bedrooms"
                className="block text-sm font-medium text-zinc-800"
              >
                Bedrooms
              </label>
              <input
                id="bedrooms"
                name="bedrooms"
                type="number"
                min={0}
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              />
            </div>
            <div>
              <label
                htmlFor="bathrooms"
                className="block text-sm font-medium text-zinc-800"
              >
                Bathrooms
              </label>
              <input
                id="bathrooms"
                name="bathrooms"
                type="number"
                min={0}
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              />
            </div>
            <div>
              <label
                htmlFor="pets"
                className="block text-sm font-medium text-zinc-800"
              >
                Pets
              </label>
              <input
                id="pets"
                name="pets"
                type="text"
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              />
            </div>
            <div>
              <label
                htmlFor="parking"
                className="block text-sm font-medium text-zinc-800"
              >
                Parking
              </label>
              <input
                id="parking"
                name="parking"
                type="text"
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              />
            </div>
          </div>
        )}
      </div>

      {/* Cloudflare Turnstile widget */}
      {siteKey ? (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
            async
            defer
          />
          <div
            className="cf-turnstile"
            data-sitekey={siteKey}
            data-theme="light"
            data-callback="onTurnstileSuccess"
          />
        </>
      ) : (
        <div className="mt-2 text-xs text-zinc-600">
          Turnstile will load in production.
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium h-11 px-6 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? 'Sending…' : site.cta}
        </button>
        {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      </div>
    </form>
  );
}

export default ContactForm;
