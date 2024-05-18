import flowbitePlugin from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "linear-dark-sky":
          "radial-gradient((circle_at_bottom_left,_var(--tw-gradient-stops)) from-slate-900 via-sky-900 to-slate-900)",
      },
      fontFamily: {
        garamond: ["Montaga", "serif"],
      },
      animation: {
        marquee: "marquee 10s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [flowbitePlugin],
};
