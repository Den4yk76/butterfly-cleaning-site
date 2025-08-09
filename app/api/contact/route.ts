import { z } from 'zod';
import { getResend } from '../../../lib/resend';
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
  // Check required environment variables early
  const requiredEnvs = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM: process.env.RESEND_FROM,
    CONTACT_TO: process.env.CONTACT_TO,
    CONTACT_REPLY_TO: process.env.CONTACT_REPLY_TO,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  };

  const missingEnvs = Object.entries(requiredEnvs)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingEnvs.length > 0) {
    console.error(`Missing required environment variables: ${missingEnvs.join(', ')}`);
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  const contentType = req.headers.get('content-type') || '';
  let body: unknown;
  if (contentType.includes('application/json')) {
    body = await req.json();
  } else if (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  ) {
    const form = await req.formData();
    body = Object.fromEntries(form.entries());
    const b = body as Record<string, unknown>;
    if (typeof b.services === 'string') {
      // Multi-select may arrive as comma-separated; normalize
      b.services = (b.services as string)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      body = b;
    }
  } else {
    return NextResponse.json(
      { error: 'Unsupported content type' },
      { status: 400 }
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // Verify Turnstile
  const token =
    data.turnstileToken ||
    (req.headers.get('cf-turnstile-response') ?? undefined);
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? undefined;
  const verification = await verifyTurnstile(token, ip);
  if (!verification.success) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
  }

  // Prepare email content
  const services = Array.isArray(data.services) ? data.services.join(', ') : data.services || '';
  const ownerSubject = `New Quote Request – ${data.name}${
    data.city ? ` (${data.city})` : ''
  }`;

  // Generate owner email HTML and text
  const ownerHtml = `
    <h2>New Quote Request</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>City:</strong> ${data.city}</p>
    <p><strong>Services:</strong> ${services}</p>
    <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
    <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
    <p><strong>Recurring:</strong> ${data.recurring}</p>
    ${data.bedrooms ? `<p><strong>Bedrooms:</strong> ${data.bedrooms}</p>` : ''}
    ${data.bathrooms ? `<p><strong>Bathrooms:</strong> ${data.bathrooms}</p>` : ''}
    ${data.pets ? `<p><strong>Pets:</strong> ${data.pets}</p>` : ''}
    ${data.parking ? `<p><strong>Parking:</strong> ${data.parking}</p>` : ''}
    ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
  `;

  const ownerText = `New Quote Request

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
City: ${data.city}
Services: ${services}
Preferred Date: ${data.preferredDate}
Preferred Time: ${data.preferredTime}
Recurring: ${data.recurring}${data.bedrooms ? `\nBedrooms: ${data.bedrooms}` : ''}${data.bathrooms ? `\nBathrooms: ${data.bathrooms}` : ''}${data.pets ? `\nPets: ${data.pets}` : ''}${data.parking ? `\nParking: ${data.parking}` : ''}${data.notes ? `\nNotes: ${data.notes}` : ''}

Tel: tel:${data.phone}`;

  // Generate customer auto-reply HTML and text
  const firstName = data.name.split(' ')[0] || '';
  const customerHtml = `
    <p>Hi ${firstName},</p>
    <p>Thanks for reaching out to The Butterfly Cleaning! We received your request and will get back to you soon to confirm details and provide a quote.</p>
    <p>If it's urgent, call us at <a href="tel:(647) 327-5163">(647) 327-5163</a>.</p>
    <p>— The Butterfly Cleaning</p>
  `;

  const customerText = `Hi ${firstName}, thanks for reaching out to The Butterfly Cleaning! We received your request and will get back to you soon to confirm details and provide a quote. If it's urgent, call us at (647) 327-5163.

— The Butterfly Cleaning`;

  const resend = getResend();
  if (!resend) {
    return NextResponse.json(
      { error: 'Email service unavailable' },
      { status: 500 }
    );
  }

  try {
    // Send owner notification email
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: [process.env.CONTACT_TO!],
      replyTo: data.email, // Customer replies go straight to them
      subject: ownerSubject,
      html: ownerHtml,
      text: ownerText,
    });

    // Send customer auto-reply
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: [data.email],
      replyTo: process.env.CONTACT_REPLY_TO!, // Customer replies reach us
      subject: 'We received your quote request',
      html: customerHtml,
      text: customerText,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
