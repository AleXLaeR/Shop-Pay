/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  media: false,
  content: ['./pages/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
