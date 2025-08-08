import type { Metadata } from 'next';
import { site } from '../config/site';
import Hero from '../components/Hero';
import ServiceCards from '../components/ServiceCards';
import AreaChips from '../components/AreaChips';
import Testimonial from '../components/Testimonial';
import CTA from '../components/CTA';
import { withOg } from '../lib/seo';
import { localBusinessJsonLd } from '../lib/schema';

export const metadata: Metadata = withOg(
  {
    title: site.name,
    description:
      'Sparkling homes & offices across York Region. Reliable, detail‑oriented cleaning. Get a free quote today.',
  },
  '/og/home.txt'
);

export default function Home() {
  const services = [
    { title: 'Residential Cleaning', href: '/services/residential-cleaning' },
    { title: 'Commercial Cleaning', href: '/services/commercial-cleaning' },
    { title: 'Deep Cleaning', href: '/services/deep-cleaning' },
    {
      title: 'Move-In/Move-Out Cleaning',
      href: '/services/move-in-move-out-cleaning',
    },
    { title: 'Window Cleaning', href: '/services/window-cleaning' },
  ];

  return (
    <main>
      {/* LocalBusiness JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            localBusinessJsonLd({
              name: site.name,
              telephone: site.phoneE164,
              url: process.env.SITE_URL || 'http://localhost:3000',
              areaServed: site.areas,
              sameAs: [site.instagram],
              slogan: 'Sparkling Homes & Offices Across York Region',
              priceRange: '$$',
              image: (process.env.SITE_URL || '') + '/og/home.svg',
            })
          ),
        }}
      />
      <Hero
        title="Sparkling Homes & Offices Across York Region"
        subtitle="Reliable, detail‑oriented cleaning in Newmarket, Richmond Hill, Vaughan, Aurora, Markham & nearby."
      />

      <section className="py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-brand-900">
            Our Top Services
          </h2>
        </div>
        <ServiceCards items={services} />
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-brand-900">
            Why choose us
          </h2>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 text-zinc-700">
            <li className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              Family-run, owner-operated.
            </li>
            <li className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              We care about the details (edges, corners, fixtures).
            </li>
            <li className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              Flexible scheduling — one-time or recurring.
            </li>
            <li className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              Satisfaction Guaranteed — if something’s not right, we’ll make it
              right.
            </li>
          </ul>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-brand-900">
            What clients say
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Testimonial
              quote="They did an amazing job! Everything was spotless."
              author="A."
              location="Newmarket"
            />
            <Testimonial
              quote="Professional, on time, and very thorough."
              author="J."
              location="Richmond Hill"
            />
            <Testimonial
              quote="Highly recommend — great attention to detail."
              author="K."
              location="Vaughan"
            />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-brand-900">
            Service area
          </h2>
          <p className="mt-2 text-zinc-700">
            If you’re nearby but don’t see your area, just ask.
          </p>
          <div className="mt-4">
            <AreaChips />
          </div>
        </div>
      </section>

      <CTA
        title="Ready for a fresh, clean space?"
        subtitle="We’ll reply quickly to confirm details and provide a quote."
      />
    </main>
  );
}

// export default function Home() {
//   return (
//     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
//               app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
