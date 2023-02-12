/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  media: false,
  content: ['./pages/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        error: {
          light: '#fd010169',
          secondary: '#f02f2fd8',
          DEFAULT: '#ed4337',
        },
        success: '#f15f6f',
      },
      transitionProperty: {
        ['cubic-bezier']: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
    colors: {
      blue: {
        dark: '#1a28f1dc',
        DEFAULT: '#2f82ff',
      },
      yellow: '#fac80f',
      green: '#3c811f',
      red: '#f15f6f',
      grey: '#f8f8f8',
      violet: '#5a31f4',
      white: '#fff',
      black: '#000',
    },
    boxShadow: {
      sm: 'rgba(99, 99, 99, 0.1) 0px 0px 4px 0px',
      md: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
