# The Butterfly Cleaning — Website

Tech: Next.js App Router + TypeScript + Tailwind v4 + next/font + next/image. Dependencies: Resend, next-sitemap, zod.

## Scripts

```bash
npm run dev
npm run build
npm start
npm run postbuild # generate sitemap/robots
```

## Environment

Create `.env.local` from `.env.example`:

```ini
RESEND_API_KEY=
RESEND_FROM="The Butterfly Cleaning <info@thebutterflycleaning.co>"
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
SITE_URL=https://thebutterflycleaning.co
```

## Content & config

- Edit phone/CTA/areas: `config/site.ts`
- Add gallery images: `public/images/`
- Service pages live in `app/services/*`

## Deploy (Vercel)

1. Connect repo
2. Add env vars above
3. Point Namecheap DNS to Vercel
4. Resend: verify domain for `RESEND_FROM`
5. Cloudflare Turnstile: create site/secret keys

## Accessibility & Performance

- Semantic HTML, labeled inputs, visible focus
- `next/image` with sizes; fonts via `next/font`
