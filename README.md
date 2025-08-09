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

3. **Verify Domain Setup** (CRITICAL - Most Common Issue):
   - **Domain Verification**: In Resend dashboard, add and verify `thebutterflycleaning.co` (NOT `send.thebutterflycleaning.co`)
   - **DNS Records**: Add the required DNS records that Resend provides:
     - TXT record for domain verification
     - MX, SPF, DKIM records for email authentication
   - **RESEND_FROM**: Must use the exact verified domain: `"The Butterfly Cleaning <no-reply@thebutterflycleaning.co>"`
   - **Common Error**: If you see `send.thebutterflycleaning.co` in logs, the domain is incorrectly configured

4. **Check Email Provider Settings**:
   - Look in spam/junk folders at `info@thebutterflycleaning.co`
   - If using Namecheap Private Email, check their spam filtering settings
   - Consider adding `no-reply@thebutterflycleaning.co` to safe senders list

5. **Common Issues**:
   - **Domain not verified**: Emails bounce with "Domain not found" error
   - **Wrong subdomain**: Using `send.thebutterflycleaning.co` instead of `thebutterflycleaning.co`
   - **DNS records missing**: Poor deliverability, emails marked as spam  
   - **Rate limiting**: Too many emails sent too quickly
   - **Email provider blocking**: Some providers block automated emails
   - **RESEND_FROM mismatch**: Email address domain doesn't match verified domain

6. **Debug Environment Variables**:
   ```bash
   # In development, check the logs for:
   # "Environment variables check:" output
   # This will show if CONTACT_TO is set correctly
   ```

### 🚨 **URGENT: Fix Domain Configuration Issue**

If you're seeing `send.thebutterflycleaning.co` domain errors in Resend logs:

#### Step 1: Check Current Domain in Resend Dashboard
1. Go to [Resend Dashboard → Domains](https://resend.com/domains)
2. Check what domain is currently added
3. If you see `send.thebutterflycleaning.co` - this is WRONG

#### Step 2: Add Correct Domain
1. **Remove** any incorrect domains (like `send.thebutterflycleaning.co`)
2. **Add** the correct domain: `thebutterflycleaning.co`
3. **Verify** the domain by adding DNS records Resend provides

#### Step 3: Update Environment Variables
Make sure your production environment variables are:
```ini
RESEND_FROM="The Butterfly Cleaning <no-reply@thebutterflycleaning.co>"
# NOT: RESEND_FROM="The Butterfly Cleaning <no-reply@send.thebutterflycleaning.co>"
```

#### Step 4: DNS Records to Add
In your Namecheap DNS settings, add these records (provided by Resend):
- **TXT record** for domain verification
- **MX record** for email receiving  
- **TXT record** for SPF: `v=spf1 include:_spf.resend.com ~all`
- **CNAME record** for DKIM (specific key provided by Resend)

#### Step 5: Wait and Test
- DNS propagation takes 24-48 hours
- Run `node test-email.js` to verify
- Check Resend logs for successful delivery

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
