/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        big_Shoulders: ["BigShoulders"],
        ga_Maamli: ["Ga_Maamli"],
        merienda:["Merienda"]
      },
    },
  },
  plugins: [],
};

