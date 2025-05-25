/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tomato: '#d12717',      
        tomatoHover: '#d12717', 
        tomatoLight: '#d12717', 
        cheese: '#FFE082',      
        crust: '#F5E0C3',       
        basil: '#81C784',       
        cream: '#FFFDF6',       
        text: '#4E342E',        
      },
    },
  },
  plugins: [],
} 