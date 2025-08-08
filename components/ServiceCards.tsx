import Link from 'next/link';

export type ServiceItem = {
  title: string;
  href: string;
  description?: string;
};

type ServiceCardsProps = {
  items: ServiceItem[];
};

export function ServiceCards({ items }: ServiceCardsProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            >
              <div className="font-heading text-xl font-semibold text-brand-900">
                {item.title}
              </div>
              {item.description ? (
                <p className="mt-2 text-sm text-zinc-700">{item.description}</p>
              ) : null}
              <div className="mt-4 text-sm font-medium text-brand-700 group-hover:text-brand-800">
                Learn more →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceCards;


