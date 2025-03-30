/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pop: ['Poppins', 'serif'],
        logo :["Anton", "serif"],
      },
      colors: {
        customGreen: '#018470',
        customRed: '#ff4f5a',
        
      },
      clipPath: {
        'circle': 'clip-path: circle(50% at 50% 50%);',
      
      },
    },
  },
  plugins: [],
}

