export async function verifyTurnstile(token: string | undefined, ip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // In dev without a secret, fail closed with a clear message
    return { success: false, code: 'missing-secret', message: 'Turnstile secret not configured' } as const;
  }
  if (!token) {
    return { success: false, code: 'missing-token', message: 'Turnstile verification token missing' } as const;
  }
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ response: token, secret, remoteip: ip }),
    });
    const data = (await res.json()) as { success: boolean; 'error-codes'?: string[] };
    if (!data.success) {
      return { success: false, code: data['error-codes']?.[0] ?? 'verification-failed', message: 'Turnstile verification failed' } as const;
    }
    return { success: true } as const;
  } catch (err) {
    return { success: false, code: 'network-error', message: 'Unable to verify Turnstile' } as const;
  }
}


