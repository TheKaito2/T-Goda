import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  safelist: [
    'bg-emerald-600',
    'bg-emerald-300',
    'bg-blue-600',
    'bg-blue-300',
    'bg-rose-600',
    'bg-rose-300',
    'bg-slate-800',
    'bg-amber-300',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          logo: '#2563EB',
          primary: '#005CBD',
          deal: '#B61B4A',
          success: '#16A34A',
          danger: '#BA1A1A',
        },
        star: '#FACC15',
        highlight: '#EAB308',
        badge: {
          blue: '#5392F9',
          pink: '#FF567D',
          orange: '#D47F00',
        },
        ink: {
          DEFAULT: '#191C22',
          soft: '#424753',
          nav: '#475569',
        },
        line: {
          DEFAULT: '#C2C6D5',
          soft: '#6B7FC6',
        },
        surface: {
          page: '#F8F9FA',
          input: '#E9E9E9',
          light: '#E7E8F1',
          tint: '#F2F3FC',
          cool: '#ECEDF6',
        },
        footer: {
          bg: '#F8FAFC',
          heading: '#0F172A',
          muted: '#64748B',
        },
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Roboto Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        frame: '1280px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
