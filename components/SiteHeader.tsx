import Link from 'next/link';
import { site } from '../config/site';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm"
            >
              <span className="sr-only">{site.name} — Home</span>
              <div className="text-lg sm:text-xl font-semibold font-heading text-brand-900">
                {site.name}
              </div>
            </Link>
          </div>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm text-zinc-700">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              aria-label={`${site.cta}`}
              className="hidden md:inline-flex items-center justify-center rounded-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium h-10 px-5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            >
              {site.cta}
            </Link>
            <a
              href={`tel:${site.phoneE164}`}
              aria-label={`Call ${site.phone}`}
              className="inline-flex md:hidden items-center justify-center rounded-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium h-10 px-4 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            >
              Call {site.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
