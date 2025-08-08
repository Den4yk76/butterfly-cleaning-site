import Link from 'next/link';
import { site } from '../config/site';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-brand-50/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-semibold font-heading text-brand-900">
              {site.name}
            </div>
            <div className="mt-3 text-sm text-zinc-700">
              <a
                href={`tel:${site.phoneE164}`}
                className="hover:text-brand-700 underline-offset-4 hover:underline"
              >
                {site.phone}
              </a>
            </div>
            <div className="mt-1 text-sm text-zinc-700">
              <a
                href={`mailto:${site.email}`}
                className="hover:text-brand-700 underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </div>
            <div className="mt-3 text-sm">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-700 hover:text-brand-700 underline-offset-4 hover:underline"
              >
                Instagram
              </a>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-zinc-900">Quick links</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hover:text-brand-700 hover:underline underline-offset-4"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2">
            <div className="text-sm font-medium text-zinc-900">
              Service area
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {site.areas.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center rounded-full border border-brand-500 bg-brand-50 px-3 py-1 text-xs text-brand-700 shadow-sm"
                >
                  {area}
                </span>
              ))}
              <span className="inline-flex items-center rounded-full border border-brand-500 bg-brand-50 px-3 py-1 text-xs text-brand-700 shadow-sm">
                {site.areasNote}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-600">
          <div>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="hover:text-brand-700 hover:underline underline-offset-4"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-brand-700 hover:underline underline-offset-4"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
