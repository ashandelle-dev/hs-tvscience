/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
    content: [
        "./src/index.js",
        "./src/js/*.js",
        "./src/layouts/**/*.html",
        "./src/modules/*.module/*.{html,js}",
        "./src/partials/**/*.html",
        "./src/templates/**/*.html",
        "./src/sections/**/*.html",
        "./src/system/**/*.html",
        "./src/macros/**/*.html",

    ],
    theme: {
   
        fontFamily: {
            plex: ["'IBM Plex Sans'", "san-serif"],
            "plex-mono": ["'IBM Plex Mono'", "monospace"],
        },
        extend: {
            animation: {
                "slide-down": "slide-down .1s ease-out both",
            },
            keyframes: {
                "slide-down": {
                    "0%": { opacity: 0, transform: "translateY(-8px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
            },
        },
        container: {
            center: true,
            screens: {
                "2xl": "1280px",
            },
            padding: {
                "DEFAULT": '1rem',
                lg: "0"    
            },
        },
    },
    plugins: [
  
    ],
};
