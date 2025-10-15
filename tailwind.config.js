/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'td-navy': '#131023',
        'td-navy-light': '#252D6E',
        'td-blue': '#3A61FF',
        'td-blue-light': '#5B7EFF',
        'td-dark': '#0A0A0F',
        'td-light': '#F8F9FA',
        'td-gray': '#6B7280',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-blue': 'linear-gradient(135deg, #3A61FF 0%, #5B7EFF 100%)',
        'gradient-navy': 'linear-gradient(135deg, #131023 0%, #252D6E 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0A0A0F 0%, #131023 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(58, 97, 255, 0.3)',
        'glow-lg': '0 0 30px rgba(58, 97, 255, 0.4)',
      },
    },
  },
  plugins: [],
}
