import {nextui} from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        beyonderOrange: '#FF8A01',
        beyonderGreen: '#3B5C65',
      }
    },
  },
  safelist: ['bg-beyonderGreen'],
  darkMode: 'class',
  plugins: [require("@tailwindcss/typography"), nextui()],
};
