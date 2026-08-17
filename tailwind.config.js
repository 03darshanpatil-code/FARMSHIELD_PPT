/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        forest: {
          950: '#0a1410',
          900: '#0d1f17',
          800: '#122a1f',
          700: '#1a3a28',
          600: '#234a35',
          500: '#2f5d44',
          400: '#3f7a57',
        },
        emerald: {
          glow: '#34d399',
        },
        lime: {
          glow: '#a3e635',
        },
        amber: {
          glow: '#f5b942',
        },
        charcoal: {
          950: '#0b0f0d',
          900: '#10161300',
          800: '#161e1a',
          700: '#1f2925',
          600: '#2a3530',
        },
        offwhite: {
          DEFAULT: '#f4f6f2',
          muted: '#cdd3c8',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        glow: '0 0 24px -4px rgba(52, 211, 153, 0.35)',
        'glow-amber': '0 0 24px -4px rgba(245, 185, 66, 0.3)',
        soft: '0 12px 40px -12px rgba(0, 0, 0, 0.55)',
        'soft-lg': '0 24px 60px -20px rgba(0, 0, 0, 0.65)',
      },
      backgroundImage: {
        'forest-radial':
          'radial-gradient(ellipse at top, rgba(35, 74, 53, 0.35), transparent 60%), radial-gradient(ellipse at bottom, rgba(10, 20, 16, 0.9), transparent 70%)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
