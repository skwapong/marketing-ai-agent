/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'td-navy': '#1e3a5f',
        'td-teal': '#0891b2',
        'td-light': '#f0f9ff',
      },
    },
  },
  plugins: [],
}
