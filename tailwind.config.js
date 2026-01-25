/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3A2E25',
        secondary: '#A3754E',
        light: '#F5F1EB',
        'text-light': '#F7F3EE',
        'text-dark': '#2E241D',
      },
      fontFamily: {
        script: ['Great Vibes', 'cursive'],
        heading: ['Bebas Neue', 'sans-serif'],
        subheading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '2rem',
        'xl': '4rem',
        'xxl': '8rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'rotate-slow': 'rotate 20s linear infinite',
        'shimmer': 'shimmer 2s infinite',
        'spin': 'spin 1s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rotate: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(163, 117, 78, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(163, 117, 78, 0.8)' },
        },
      },
      boxShadow: {
        'subtle': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'medium': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'elevated': '0 20px 60px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 40px rgba(163, 117, 78, 0.15)',
      },
    },
  },
  plugins: [],
}