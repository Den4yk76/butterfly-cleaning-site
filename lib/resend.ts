import { Resend } from 'resend';

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export function getFromAddress() {
  return process.env.RESEND_FROM ?? 'The Butterfly Cleaning <info@thebutterflycleaning.co>';
}


