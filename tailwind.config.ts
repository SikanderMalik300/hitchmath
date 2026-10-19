import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        brand: 'var(--brand)',
        'brand-ink': 'var(--brand-ink)',
        'band-1': 'var(--band-1)',
        'band-2': 'var(--band-2)',
        'band-3': 'var(--band-3)',
        'band-4': 'var(--band-4)',
        warn: 'var(--warn)',
        ok: 'var(--ok)',
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
        calc: '720px',
        prose: '75ch',
      },
      borderRadius: {
        photo: '4px',
        card: '16px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,.04)',
      },
      fontSize: {
        h1: ['40px', { lineHeight: '1.15' }],
        'h1-m': ['30px', { lineHeight: '1.15' }],
        h2: ['28px', { lineHeight: '1.2' }],
        'h2-m': ['24px', { lineHeight: '1.2' }],
        h3: ['20px', { lineHeight: '1.3' }],
        body: ['16px', { lineHeight: '1.6' }],
        small: ['14px', { lineHeight: '1.5' }],
      },
    },
  },
  plugins: [],
};

export default config;
