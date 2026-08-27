/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vastra: {
          bg: '#F0EBE1',            // Rich Warm Ivory Stone (NOT plain white)
          secondaryBg: '#E5DDD0',   // Warm Sand
          sectionBg: '#E2D8C8',     // Deep Stone Beige
          card: '#FAF6F0',          // Soft Warm Cream Card
          mutedTaupe: '#D8CDBF',    // Muted Taupe
          charcoal: '#1C1C1C',      // Charcoal Primary Text
          warmGrey: '#666666',      // Warm Grey Secondary Text
          champagneGold: '#B98A4B', // Champagne Gold Accent
          softBronze: '#C8A977',    // Soft Bronze Accent
          border: 'rgba(28, 28, 28, 0.08)',
          borderLight: 'rgba(28, 28, 28, 0.04)',
          rose: '#E53935',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter Tight', 'sans-serif'],
        editorial: ['Inter Tight', 'sans-serif'],
      },
      boxShadow: {
        'threadlab': '0 20px 50px -10px rgba(28, 28, 28, 0.07), 0 4px 12px -2px rgba(28, 28, 28, 0.03)',
        'threadlab-hover': '0 30px 70px -15px rgba(28, 28, 28, 0.12), 0 8px 20px -4px rgba(28, 28, 28, 0.04)',
        'floating': '0 35px 80px -20px rgba(28, 28, 28, 0.15)',
      }
    },
  },
  plugins: [],
}
