'use client';

import { useState, useCallback, useRef } from 'react';
import { Check, X, Info, Copy, Share2, Printer } from 'lucide-react';
import type { Unit } from '@/lib/format';
import { track } from '@/lib/analytics';

/** Fire tool_used once on the first input change (A9). */
export function useToolUsed() {
  const fired = useRef(false);
  return useCallback(() => {
    if (fired.current) return;
    fired.current = true;
    track('tool_used');
  }, []);
}

/** A labelled number input (label above, 44px target, decimal keypad). */
export function Field({
  label,
  value,
  onChange,
  help,
  suffix,
  id,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  help?: string;
  suffix?: string;
  id: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-small font-medium text-ink">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full rounded-[8px] border border-line bg-surface px-3 text-body text-ink tabular placeholder:text-muted focus-visible:border-brand"
        />
        {suffix && <span className="shrink-0 text-small text-muted">{suffix}</span>}
      </div>
      {help && <p className="text-small text-muted">{help}</p>}
    </div>
  );
}

/** A labelled select. */
export function SelectField({
  label,
  value,
  onChange,
  options,
  id,
  help,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  id: string;
  help?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-small font-medium text-ink">
        {label}
      </label>
      <select
        id={id}
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-[8px] border border-line bg-surface px-3 text-body text-ink focus-visible:border-brand"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {help && <p className="text-small text-muted">{help}</p>}
    </div>
  );
}

/** lb/kg segmented pill. */
export function UnitToggle({ unit, setUnit }: { unit: Unit; setUnit: (u: Unit) => void }) {
  return (
    <div
      role="group"
      aria-label="Units"
      className="inline-flex rounded-pill border border-line p-0.5 text-small"
    >
      {(['lb', 'kg'] as Unit[]).map((u) => (
        <button
          key={u}
          type="button"
          aria-pressed={unit === u}
          onClick={() => setUnit(u)}
          className={`min-h-[36px] rounded-pill px-4 ${
            unit === u ? 'bg-brand text-brand-ink' : 'text-ink'
          }`}
        >
          {u}
        </button>
      ))}
    </div>
  );
}

export type Status = 'within' | 'over' | 'notChecked';

/** One result line with an icon AND the word (never colour alone). */
export function CheckRow({ status, children }: { status: Status; children: React.ReactNode }) {
  const map = {
    within: { word: 'Within', cls: 'text-ok', Icon: Check },
    over: { word: 'Over', cls: 'text-warn', Icon: X },
    notChecked: { word: 'Not checked', cls: 'text-muted', Icon: Info },
  } as const;
  const { word, cls, Icon } = map[status];
  return (
    <li className="flex items-start gap-2 py-1.5 text-body">
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${cls}`} aria-hidden="true" strokeWidth={1.5} />
      <span>
        <span className={`font-medium ${cls}`}>{word}</span>
        <span className="text-ink"> · {children}</span>
      </span>
    </li>
  );
}

export function ShowMath({ children }: { children: React.ReactNode }) {
  return (
    <details className="mt-4">
      <summary className="cursor-pointer text-small text-brand underline underline-offset-2">
        Show the math
      </summary>
      <div className="prose-body mt-2 text-small text-muted">{children}</div>
    </details>
  );
}

/** Copy result / Share link / Print actions. */
export function ActionButtons({
  resultText,
  shareParams,
}: {
  resultText: string;
  shareParams: Record<string, string>;
}) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const copyResult = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      track('copy_result');
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }, [resultText]);

  const shareLink = useCallback(async () => {
    const url = new URL(window.location.href);
    url.search = new URLSearchParams(shareParams).toString();
    try {
      await navigator.clipboard.writeText(url.toString());
      setShared(true);
      track('share_link');
      setTimeout(() => setShared(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }, [shareParams]);

  const btn =
    'inline-flex min-h-[44px] items-center gap-1.5 rounded-pill border border-line px-4 text-small text-ink hover:border-brand';

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <button type="button" onClick={copyResult} className={btn}>
        <Copy className="h-4 w-4" aria-hidden="true" strokeWidth={1.5} />
        {copied ? 'Copied' : 'Copy result'}
      </button>
      <button type="button" onClick={shareLink} className={btn}>
        <Share2 className="h-4 w-4" aria-hidden="true" strokeWidth={1.5} />
        {shared ? 'Link copied' : 'Share link'}
      </button>
      <button type="button" onClick={() => window.print()} className={btn}>
        <Printer className="h-4 w-4" aria-hidden="true" strokeWidth={1.5} />
        Print
      </button>
    </div>
  );
}

/** Card wrappers. */
export function InputsCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-card border border-line bg-surface p-5 shadow-card">{children}</div>
  );
}

export function ResultCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-4 rounded-card border border-line bg-surface p-5 shadow-card"
      aria-live="polite"
    >
      {children}
    </div>
  );
}
