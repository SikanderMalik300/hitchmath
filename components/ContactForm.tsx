'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'ok' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append('access_key', accessKey);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus('ok');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const field = 'h-11 w-full rounded-[8px] border border-line bg-surface px-3 text-body text-ink';

  return (
    <form onSubmit={onSubmit} className="max-w-prose space-y-4">
      {/* Honeypot: hidden from users, catches bots */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="c-name" className="text-small font-medium text-ink">
          Name
        </label>
        <input id="c-name" name="name" type="text" required className={field} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="c-email" className="text-small font-medium text-ink">
          Email
        </label>
        <input id="c-email" name="email" type="email" required className={field} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="c-message" className="text-small font-medium text-ink">
          Message
        </label>
        <textarea
          id="c-message"
          name="message"
          required
          rows={6}
          className="w-full rounded-[8px] border border-line bg-surface p-3 text-body text-ink"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending' || accessKey === ''}
        className="min-h-[44px] rounded-pill bg-brand px-6 text-brand-ink disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending' : 'Send'}
      </button>

      {accessKey === '' && (
        <p className="text-small text-muted">
          The form is not configured yet. Email hello@hitchmath.com in the meantime.
        </p>
      )}
      {status === 'ok' && (
        <p role="status" className="text-small text-ok">
          Thanks. Your message was sent.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="text-small text-warn">
          Something went wrong. Please email hello@hitchmath.com.
        </p>
      )}
    </form>
  );
}
