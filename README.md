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
RESEND_FROM="The Butterfly Cleaning <no-reply@thebutterflycleaning.co>"
CONTACT_TO=info@thebutterflycleaning.co
CONTACT_REPLY_TO=info@thebutterflycleaning.co
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
SITE_URL=https://thebutterflycleaning.co
```

## Email & Turnstile Setup

### Required Environment Variables

Set these in Vercel project settings → Environment Variables:

- **`RESEND_API_KEY`**: Get from [Resend Dashboard](https://resend.com/api-keys)
- **`RESEND_FROM`**: `"The Butterfly Cleaning <no-reply@thebutterflycleaning.co>"` (must match verified domain)
- **`CONTACT_TO`**: `info@thebutterflycleaning.co` (where owner notifications are sent)
- **`CONTACT_REPLY_TO`**: `info@thebutterflycleaning.co` (where customer replies are sent)
- **`NEXT_PUBLIC_TURNSTILE_SITE_KEY`**: Get from [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
- **`TURNSTILE_SECRET_KEY`**: Secret key from Cloudflare Turnstile
- **`SITE_URL`**: `https://thebutterflycleaning.co` (production URL)

### Resend Configuration

1. **Domain Verification**: In Resend dashboard, add domain `thebutterflycleaning.co` and add the required DNS records
2. **Email Flow**: 
   - Owner gets notification at `CONTACT_TO` with all form details and clickable phone number
   - Customer gets auto-reply from `RESEND_FROM` with friendly confirmation
   - Reply-to headers ensure replies go to the right address

### Cloudflare Turnstile

1. **Site Registration**: Add your domain in Cloudflare Dashboard → Turnstile
2. **Keys**: Get both site key (public) and secret key (private)
3. **Verification**: Server-side verification prevents form spam

### Testing the Email Flow

#### Local Development
```bash
# Test with development Turnstile token (bypasses verification)
npm run dev
# Submit form - should work with test token if NODE_ENV=development
```

#### Production Testing
1. Deploy to Vercel with all environment variables set
2. Submit form at `https://thebutterflycleaning.co/contact` with realistic data
3. Verify two emails arrive:
   - **Owner notification** at `info@thebutterflycleaning.co` with all form fields and tel: link
   - **Customer confirmation** at submitted email address
4. **Check headers**: From, Reply-To, and deliverability
5. **Negative tests**:
   - Remove/alter Turnstile token → should return 400 "Verification failed"
   - Send invalid form data → should return 400 with validation message

### Troubleshooting Email Delivery

#### If owner emails are not being received:

1. **Test Email Script**: Run the debug script:
   ```bash
   node test-email.js
   ```

2. **Check Resend Dashboard**: 
   - Go to [Resend Logs](https://resend.com/logs) 
   - Look for both sent emails and their delivery status
   - Check for any bounce or delivery failures

3. **Verify Domain Setup**:
   - Ensure `thebutterflycleaning.co` is verified in Resend
   - Check that DNS records (SPF, DKIM, DMARC) are properly configured
   - Verify RESEND_FROM uses the verified domain: `no-reply@thebutterflycleaning.co`

4. **Check Email Provider Settings**:
   - Look in spam/junk folders at `info@thebutterflycleaning.co`
   - If using Namecheap Private Email, check their spam filtering settings
   - Consider adding `no-reply@thebutterflycleaning.co` to safe senders list

5. **Common Issues**:
   - **Domain not verified**: Emails will be rejected
   - **DNS records missing**: Poor deliverability, emails marked as spam
   - **Rate limiting**: Too many emails sent too quickly
   - **Email provider blocking**: Some providers block automated emails

6. **Debug Environment Variables**:
   ```bash
   # In development, check the logs for:
   # "Environment variables check:" output
   # This will show if CONTACT_TO is set correctly
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
