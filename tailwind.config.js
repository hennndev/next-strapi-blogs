module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
          gridTemplateColumns: {
              'cards': 'repeat(auto-fill, minmax(300px, 1fr))'
          },
      },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('tailwind-scrollbar-hide')
    ],
}