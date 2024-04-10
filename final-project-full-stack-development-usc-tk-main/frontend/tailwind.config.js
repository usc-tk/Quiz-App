/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      colors: {
        'primary-main': "#8402cf",
        'primary-mid': "#980ee8",
        'primary-light': "#aa17ff",
        'secondary-main': "#d4ccd9",
        'secondary-mid': "#e7e1eb",
        'secondary-light': "#f9f7fa",
        'secondary-dark':"#8a8a8a",
        'text-main': "#161517",
        'text-mid': "#282629",
        'text-light': '#3c3b3d',
        'fail':'#FF0000',
        'success':"#4BB543",

      },
      fontSize:{
        xl:'30px',
        lg:"25px",
        md:"20px",
        sm:"18px",
        xs:"16px",
        xxs:"14px"
      }
    },
  },
  plugins: [],
}