# Cursor Rules — The Butterfly Cleaning

## Hard constraints
- Framework: Next.js 14 App Router + TypeScript + Tailwind + next/font.
- Do NOT add heavy libs (no CMS, no booking system, no review/IG feed widgets) in v1.
- Emails: use Resend API from a server route. No SMTP creds in code.
- Anti-spam: Cloudflare Turnstile on the contact form, verify server-side.
- SEO: use Next Metadata API, next-sitemap, and JSON-LD (LocalBusiness/Service/FAQ).
- Content & copy:
  - Primary CTA: “Get a Free Quote”.
  - Pricing line: **“We offer flat quotes or hourly billing. No strict minimum — preferred minimum booking is 3–4 hours.”**
  - Do NOT mention eco-friendly products anywhere.
- Brand palette (exact): brand.500 `#62B4E6`, brand.600 `#328BC8`, brand.700 `#1872B5`, brand.900 `#16314B`, brand.50 `#EAF6FE`.
- Service areas: Newmarket, Richmond Hill, Vaughan, Maple, Aurora, Markham, King City, North York, Thornhill, Concord, Woodbridge, Stouffville + “and nearby GTA”.

## Code hygiene
- Create constants in `/config/site.ts` (phone, CTA text, areas, socials) and use them across pages.
- Keep components small and accessible (labels, focus states).
- No keys in source; read from `process.env`.

## Deliverables
- Pages per SPEC.
- `/api/contact` with Turnstile verification + Resend owner email + client auto-reply.
- README with setup steps (DNS/Resend/Turnstile/Vercel).
