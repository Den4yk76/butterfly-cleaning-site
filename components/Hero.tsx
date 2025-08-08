import Link from 'next/link';
import { site } from '../config/site';

type HeroProps = {
  title: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  showCallOnMobile?: boolean;
};

export function Hero({
  title,
  subtitle,
  primaryHref = '/contact',
  primaryLabel = site.cta,
  showCallOnMobile = true,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-3xl">
          <h1 className="font-heading text-3xl sm:text-5xl font-semibold tracking-tight text-brand-900">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 text-lg text-zinc-700">{subtitle}</p>
          ) : null}
          <div className="mt-8 flex items-center gap-3">
            <Link
              href={primaryHref}
              aria-label={primaryLabel}
              className="inline-flex items-center justify-center rounded-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium h-11 px-6 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            >
              {primaryLabel}
            </Link>
            {showCallOnMobile ? (
              <a
                href={`tel:${site.phoneE164}`}
                aria-label={`Call ${site.phone}`}
                className="inline-flex sm:hidden items-center justify-center rounded-full border border-brand-600 text-brand-700 hover:text-white hover:bg-brand-700 text-sm font-medium h-11 px-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                Call {site.phone}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;


