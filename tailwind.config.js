/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  media: false,
  content: ['./pages/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        error: {
          dark: '#fd010169',
          secondary: '#e14040d8',
          DEFAULT: '#ee7c78',
        },
        dimmed: 'rgba(255, 255, 255, 0.5)',
        success: '#47ee61',
      },
      transitionProperty: {
        ['cubic-bezier']: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      borderColor: {
        greyish: 'rgba(102, 102, 102, 0.35)',
      },
      placeholderColor: {
        white: '#fff',
      }
    },
    colors: {
      blue: {
        dark: '#1a28f1dc',
        DEFAULT: '#2f82ff',
        darkish: '#0000ff34',
      },
      yellow: '#fac80f',
      green: '#3c811f',
      red: '#f15f6f',
      grey: {
        dark: '#666',
        lighter: '#999',
        light: '#ccc',
        DEFAULT: '#f8f8f8',
      },
      violet: '#5a31f4',
      white: {
        dark: '#eee',
        DEFAULT: '#fff',
      },
      black: {
        lighter: '#333',
        light: '#222',
        DEFAULT: '#000',
      },
      transparent: 'transparent',
      current: 'currentColor',
    },
    boxShadow: {
      sm: 'rgba(99, 99, 99, 0.1) 0px 0px 4px 0px',
      md: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
