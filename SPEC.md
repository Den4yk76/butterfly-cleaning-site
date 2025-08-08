The Butterfly Cleaning — Website Build Spec (v1)
Owner: Denys (on behalf of business owner)
Business: The Butterfly Cleaning
Phone: (647) 327-5163
Instagram: @thebutterflycleaning
Domain: thebutterflycleaning.co
Primary CTA: Get a Free Quote

0) Goals & Principles
Light, bright, modern (white-first, soft blue accent like the business card).

Convert visitors to leads via a single, obvious CTA on every page.

Simple (no heavy CMS/widgets in v1).

Local SEO-ready for GTA/York Region.

Phaseable: ship fast with EN only; keep i18n scaffold for UA/RU later.

Success metrics (v1): ship ≤ 3 days; Lighthouse ≥ 90 in all categories; ≥ 5 quote submissions first month.

1) Sitemap
/ Home

/services (index)

/services/residential-cleaning

/services/commercial-cleaning

/services/deep-cleaning

/services/move-in-move-out-cleaning

/services/window-cleaning

/about

/gallery (before/after)

/reviews

/contact (thank-you page: /contact/thank-you)

/privacy • /terms
(Optional later: /service-area, /blog)

2) UX & Content Overview
Header (sticky): Logo, nav (Home, Services, Gallery, Reviews, About, Contact), primary CTA; on mobile add a visible Call button.

Footer: Business name, phone (tap-to-call), email, quick links, social icons, service-area chips, privacy/terms.

Trust: Satisfaction Guarantee badge; 3 review highlights; before/after carousel.

Service-area chips: Newmarket, Richmond Hill, Vaughan, Maple, Aurora, Markham, King City, North York, Thornhill, Concord, Woodbridge, Stouffville + “and nearby GTA.”

3) Visual / Brand System
Palette (from logo):

brand.50 #EAF6FE

brand.500 #62B4E6

brand.600 #328BC8

brand.700 #1872B5

brand.900 #16314B

Typography: Headings — Playfair Display; Body/UI — Manrope (via next/font/google).

Style: whitespace, subtle shadows, rounded-xl, gentle in-view motion.

4) Copy Drafts (EN)
Home
Hero: Sparkling Homes & Offices Across York Region
Sub: Reliable, detail-oriented cleaning in Newmarket, Richmond Hill, Vaughan, Aurora, Markham & nearby.
Buttons: Get a Free Quote (primary), Call (647) 327-5163 (mobile secondary)

Top services (cards): Residential • Commercial/Office • Deep • Move-In/Out • Windows

Why choose us

Family-run, owner-operated.

We care about the details (edges, corners, fixtures).

Flexible scheduling — one-time or recurring.

Satisfaction Guaranteed — If something’s not right, we’ll make it right.

Before/After carousel (placeholders ok)
Review highlights (3)
Service-area chips + note: If you’re nearby but don’t see your area, just ask.
CTA stripe.

Services (index + details)
Each detail page covers what’s included / options / frequency.

Residential: dusting/baseboards/fixtures; kitchen wipe-down (exterior appliances, counters, sink); bathrooms; vacuum & mop; spot tidy.
Add-ons: inside oven/fridge, inside cabinets, windows, balcony/patio.
Frequency: one-time, weekly, bi-weekly, monthly.

Commercial/Office: desks & commons, washrooms, kitchenette, entryways, trash, floors; during/after hours; schedules available.

Deep: edges, corners, vents, switches, backsplash/grout; behind/under accessible furniture; high-touch points.

Move-In/Move-Out: empty-space detailing; cabinets/drawers inside; baseboards; closets; appliances inside/out.

Windows: interior (+ accessible exterior); frames/sills/ledges; streak-free finish.

Pricing note (site-wide)
We offer flat quotes or hourly billing. No strict minimum — preferred minimum booking is 3–4 hours.

About
Short story; owner/team photo later.
Badges: Satisfaction Guaranteed, Locally operated, Flexible scheduling.

Gallery
Grid of before/after (lightbox). Use local public/images for now; Cloudinary optional later.

Reviews
Curated quotes; link “View more on Google” later.

Contact
Lead-in: Tell us about your place and preferred date/time — we’ll reply quickly to confirm details and provide a quote.
Form fields: Name*, Phone*, Email*, City (dropdown), Services (multi-select), Preferred date, Preferred time (morning/afternoon/evening), Recurring (one-time/weekly/bi-weekly/monthly), Notes.
More details (optional): Bedrooms, Bathrooms, Pets, Parking.
Anti-spam: Cloudflare Turnstile widget.
After submit → /contact/thank-you confirmation page.

5) Technical Stack & Setup
Next.js 14+ (App Router) + TypeScript

Tailwind v4 (@import "tailwindcss" in app/globals.css; brand tokens defined with @theme)

next/font for fonts, next/image for media

Deploy Vercel (+ Vercel Analytics)

Email: Resend (server route)

Anti-spam: Cloudflare Turnstile

SEO: next-sitemap for sitemap.xml & robots.txt; JSON-LD (LocalBusiness, Service, FAQ)

i18n (phase 2): next-intl scaffold, EN default; uk/ru later

Folder outline

app/
  layout.tsx
  page.tsx
  contact/page.tsx
  contact/thank-you/page.tsx
  services/page.tsx
  services/{residential-cleaning|commercial-cleaning|deep-cleaning|move-in-move-out-cleaning|window-cleaning}/page.tsx
  about/page.tsx
  gallery/page.tsx
  reviews/page.tsx
  api/contact/route.ts
components/
  ui/...
  SiteHeader.tsx
  SiteFooter.tsx
  Hero.tsx
  CTA.tsx
  ServiceCards.tsx
  Testimonial.tsx
  BeforeAfter.tsx
  AreaChips.tsx
  ContactForm.tsx
lib/
  resend.ts
  turnstile.ts
  seo.ts
  schema.ts
config/site.ts
public/images/

Env (.env.local)

RESEND_API_KEY=...
RESEND_FROM="The Butterfly Cleaning <info@thebutterflycleaning.co>"
TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...
SITE_URL=https://thebutterflycleaning.co

6) Email (Resend)
Owner email: subject New Quote Request – {name} ({city}) with all fields + tel: link.

Client auto-reply: friendly confirmation + phone for urgent questions.

Example auto-reply:

Hi {FirstName}, thanks for reaching out to The Butterfly Cleaning! We received your request and will get back to you soon to confirm details and provide a quote. If it’s urgent, call us at (647) 327-5163. — The Butterfly Cleaning

7) Anti-Spam (Turnstile)
Add widget to form; server verifies cf-turnstile-response before sending any emails.

On fail → 400 with a friendly error.

8) SEO
Titles/descriptions via Next Metadata API; OG images for key pages.

next-sitemap → /sitemap.xml, /robots.txt.

JSON-LD examples:

LocalBusiness (Home)

{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "The Butterfly Cleaning",
  "telephone": "+1-647-327-5163",
  "areaServed": ["Newmarket","Richmond Hill","Vaughan","Maple","Aurora","Markham","King City","North York","Thornhill","Concord","Woodbridge","Stouffville"],
  "url": "https://thebutterflycleaning.co",
  "image": "https://thebutterflycleaning.co/og/home.jpg",
  "sameAs": ["https://instagram.com/thebutterflycleaning"],
  "slogan": "Sparkling Homes & Offices Across York Region",
  "priceRange": "$$"
}

Service (per service page)

{
  "@context":"https://schema.org",
  "@type":"Service",
  "serviceType":"Residential Cleaning",
  "areaServed":"York Region / GTA",
  "provider":{"@type":"LocalBusiness","name":"The Butterfly Cleaning"},
  "description":"Ongoing upkeep for houses, condos and apartments. One-time or recurring."
}

FAQ (Contact/Services)

{
  "@context":"https://schema.org",
  "@type":"FAQPage",
  "mainEntity":[
    {"@type":"Question","name":"Do you have a minimum?","acceptedAnswer":{"@type":"Answer","text":"No strict minimum — preferred minimum booking is 3–4 hours."}},
    {"@type":"Question","name":"Do you bring supplies?","acceptedAnswer":{"@type":"Answer","text":"Yes, we bring standard supplies and tools."}}
  ]
}

9) Accessibility & Performance
Color contrast AA+; semantic HTML; labeled inputs; visible focus states.

Alt text for images; fixed dimensions; lazy loading; minimal layout shift.

Targets: TTFB < 200ms (Vercel), CLS < 0.1, LCP < 2.5s on 4G.

10) Deployment & DNS
Vercel project → connect repo.

Namecheap DNS → Vercel (apex + www).

Resend domain verification; Turnstile keys in .env.local and Vercel.

Enable Vercel Analytics; add site to Google Search Console (submit sitemap.xml).

11) Component Inventory (props abbreviated)
SiteHeader { navLinks }

SiteFooter { phone, socials, quickLinks, areas }

Hero { title, subtitle, ctas }

ServiceCards { items }

BeforeAfter { items }

Testimonial { quote, author, location }

AreaChips { areas }

CTA { title, subtitle, primaryHref }

ContactForm (Turnstile + POST /api/contact)

12) Form API Contract
POST /api/contact
Body:

{
  "name":"string",
  "phone":"string",
  "email":"string",
  "city":"string",
  "services":["residential","commercial","deep","move","windows"],
  "preferredDate":"YYYY-MM-DD",
  "preferredTime":"morning|afternoon|evening",
  "recurring":"one-time|weekly|bi-weekly|monthly",
  "notes":"string",
  "turnstileToken":"string"
}

Responses: 200 {ok:true}, 400 {error:"..."}

13) Policies & Guarantees
Satisfaction Guarantee: If anything was missed, tell us within 24 hours and we’ll return to make it right at no extra charge.

Supplies: We bring standard supplies & tools.

Pets: We’re pet-friendly — please let us know if animals will be present.

14) Phase-2 Backlog
UA/RU translations (next-intl) and language switcher.

Google Business Profile + live reviews widget (server-cached).

Instagram gallery (server-cached feed or curated manual gallery).

Simple quote estimator (checkbox add-ons; email includes structured line items).

Blog (cleaning tips) for SEO.

15) Build Plan (for Cursor / GPT-5)
Implement theme (colors, fonts), header/footer.

Build Home (hero, services, why-us, before/after, reviews, areas, CTA).

Build Services index + 5 detail pages (with JSON-LD per page).

Build About, Gallery (lightbox), Reviews.

Build Contact with Turnstile + /api/contact using Resend (owner + auto-reply).

Add Metadata API SEO, OG images, next-sitemap.

Add Vercel Analytics; test Lighthouse; fix a11y.

Configure Vercel + DNS (Namecheap), Resend domain, Turnstile keys.

Launch and verify forms/emails; add site to Search Console.