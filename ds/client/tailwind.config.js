/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      width: {
        'mainw': '1280px',
        'heroimg': '541px',
        1232: '1232px',
        411: '411px',
        710: '710px',
      },
      height: {
        navh: '90px',
        heroimg: '664px',
        400: '400px',
        500: '500px',
      },
      colors: {
        navbg: '#E6F6FE',
        bigtext: '#011632',
        smalltext: '#3C4959',
        clock:'#25B4F8',
        card: '#F2F0F2',
        price:'#00449D',
      },
      fontSize: {
        '6.5' : '65px',
      },
      margin: { 
        33 : '33%',
        "10%": '10%',
      }, 
      backgroundImage: {
        login: "url('/src/img/login.png')",
        register: "url('/src/img/register.png')",
        part: "url('/src/img/part.png')",

      }

    },
  },
  plugins: [],
}

