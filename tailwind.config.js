/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.image-rendering-pixelated': {
          'image-rendering': 'pixelated',
          '-ms-interpolation-mode': 'nearest-neighbor',
          'image-rendering': '-moz-crisp-edges',
          'image-rendering': '-webkit-optimize-contrast',
        },
      })
    },
  ],
}
