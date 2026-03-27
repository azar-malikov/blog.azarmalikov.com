/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: 'rgb(var(--color-canvas) / <alpha-value>)',
          muted: 'rgb(var(--color-canvas-muted) / <alpha-value>)',
          elevated: 'rgb(var(--color-canvas-elevated) / <alpha-value>)'
        },
        ink: {
          DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
          muted: 'rgb(var(--color-ink-muted) / <alpha-value>)',
          faint: 'rgb(var(--color-ink-faint) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          hover: 'rgb(var(--color-accent-hover) / <alpha-value>)',
          soft: 'rgb(var(--color-accent-soft) / <alpha-value>)'
        },
        signal: {
          DEFAULT: 'rgb(var(--color-signal) / <alpha-value>)',
          soft: 'rgb(var(--color-signal-soft) / <alpha-value>)'
        },
        line: 'rgb(var(--color-line) / <alpha-value>)',
        ribbon: 'rgb(var(--color-ribbon) / <alpha-value>)',
        warn: 'rgb(var(--color-warn) / <alpha-value>)',
        ok: 'rgb(var(--color-ok) / <alpha-value>)'
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        ui: ['"Syne"', 'system-ui', 'sans-serif'],
        body: ['"Newsreader"', '"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Syne"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace']
      },
      fontSize: {
        'display-xl': ['clamp(2.25rem,5vw,3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(1.75rem,3vw,2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }]
      },
      boxShadow: {
        card: '0 1px 0 rgb(var(--color-line) / 0.45)',
        lift: '0 8px 24px -12px rgb(12 18 32 / 0.12)'
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)'
      },
      maxWidth: {
        measure: '68ch',
        content: '72rem'
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem'
      },
      animation: {
        'fade-up': 'fadeUp 0.5s var(--ease-out) both',
        'grain': 'grain 8s steps(10) infinite'
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-2%,-2%)' },
          '30%': { transform: 'translate(3%,-1%)' },
          '50%': { transform: 'translate(-1%,2%)' },
          '70%': { transform: 'translate(2%,1%)' }
        }
      }
    }
  },
  plugins: []
};
