/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'brand-green':'#40ba58',
        'light-green':'#E5F8ED',
        'success':'#55C770',
        'brand-navy':'#0a122a',
        'brand-dark':'#283045',
        // dark mode vars
        'brand-night':'#0F172A',
        'brand-night-box':'#1E293B',

        'brand-gray':'#656B7A',
        'prose':'#474a52'
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

