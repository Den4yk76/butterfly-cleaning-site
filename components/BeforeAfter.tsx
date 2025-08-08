import Image from 'next/image';

type BeforeAfterItem = {
  beforeSrc: string;
  afterSrc: string;
  alt?: string;
};

type BeforeAfterProps = {
  items: BeforeAfterItem[];
};

export function BeforeAfter({ items }: BeforeAfterProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((it, idx) => (
            <div key={idx} className="grid grid-cols-2 gap-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-zinc-200">
                <Image src={it.beforeSrc} alt={it.alt ?? 'Before'} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">Before</span>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-zinc-200">
                <Image src={it.afterSrc} alt={it.alt ?? 'After'} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">After</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BeforeAfter;


