import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        forest: '#173F2B',
        leaf: '#4F7D43',
        gold: '#D9A52E',
        ivory: '#F8F6EF',
        sage: '#E8EEE3',
        'text-dark': '#202A22',
        'text-muted': '#69736A',
      },
      fontFamily: {
        sans: ['var(--font-vazirmatn)', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
