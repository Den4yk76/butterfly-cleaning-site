import Link from 'next/link';
import { site } from '../config/site';

type CTAProps = {
  title: string;
  subtitle?: string;
  href?: string;
  label?: string;
};

export function CTA({ title, subtitle, href = '/contact', label = site.cta }: CTAProps) {
  return (
    <section className="py-10 sm:py-12 bg-brand-50 border-t border-brand-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-brand-900">{title}</h2>
          {subtitle ? <p className="mt-1 text-zinc-700">{subtitle}</p> : null}
        </div>
        <div>
          <Link
            href={href}
            aria-label={label}
            className="inline-flex items-center justify-center rounded-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium h-11 px-6 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            {label}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTA;


