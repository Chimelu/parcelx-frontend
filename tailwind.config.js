import { defineConfig } from 'tailwindcss'

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'parcelx-brown': '#301E0A',
        'parcelx-gold': '#FFB500',
        'parcelx-gray': '#F2F2F2',
        'parcelx-green': '#2ECC71',
      }
    },
  },
  plugins: [],
})