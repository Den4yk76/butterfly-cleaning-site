import { z } from 'zod';
import { getResend, getFromAddress } from '../../../lib/resend';
import { verifyTurnstile } from '../../../lib/turnstile';
import { NextRequest, NextResponse } from 'next/server';

const schema = z.object({
  name: z.string().min(1),
  phone: z.string().min(5),
  email: z.string().email(),
  city: z.string().optional().default(''),
  services: z.union([z.array(z.string()), z.string()]).optional(),
  preferredDate: z.string().optional().default(''),
  preferredTime: z.string().optional().default(''),
  recurring: z.string().optional().default('one-time'),
  notes: z.string().optional().default(''),
  bedrooms: z.string().optional().default(''),
  bathrooms: z.string().optional().default(''),
  pets: z.string().optional().default(''),
  parking: z.string().optional().default(''),
  // Turnstile token name from SPEC
  turnstileToken: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') || '';
  let body: any;
  if (contentType.includes('application/json')) {
    body = await req.json();
  } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    const form = await req.formData();
    body = Object.fromEntries(form.entries());
    if (typeof body.services === 'string') {
      // Multi-select may arrive as comma-separated; normalize
      body.services = body.services.split(',').map((s: string) => s.trim()).filter(Boolean);
    }
  } else {
    return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  const data = parsed.data;

  // Verify Turnstile
  const token = data.turnstileToken || (req.headers.get('cf-turnstile-response') ?? undefined);
  const ip = req.headers.get('x-forwarded-for') ?? undefined;
  const verification = await verifyTurnstile(token, ip);
  if (!verification.success) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
  }

  // Prepare email content
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const services = Array.isArray(data.services) ? data.services.join(', ') : '';
  const ownerSubject = `New Quote Request – ${data.name}${data.city ? ` (${data.city})` : ''}`;
  const details = `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nCity: ${data.city}\nServices: ${services}\nPreferred date: ${data.preferredDate}\nPreferred time: ${data.preferredTime}\nRecurring: ${data.recurring}\nBedrooms: ${data.bedrooms}\nBathrooms: ${data.bathrooms}\nPets: ${data.pets}\nParking: ${data.parking}\nNotes: ${data.notes}`;

  const resend = getResend();
  const from = getFromAddress();

  if (resend) {
    // Owner email
    await resend.emails.send({
      from,
      to: [from],
      subject: ownerSubject,
      text: `${details}\n\nTel: tel:${data.phone}`,
    });
    // Client auto-reply
    await resend.emails.send({
      from,
      to: [data.email],
      subject: 'We received your quote request',
      text: `Hi ${data.name.split(' ')[0] || ''}, thanks for reaching out to The Butterfly Cleaning! We received your request and will get back to you soon to confirm details and provide a quote. If it’s urgent, call us at ${process.env.RESEND_FROM?.match(/<([^>]+)>/) ? '(647) 327-5163' : '(647) 327-5163)'}.

You submitted:\n${details}\n\nVisit ${siteUrl}`,
    });
  }

  return NextResponse.json({ ok: true });
}


