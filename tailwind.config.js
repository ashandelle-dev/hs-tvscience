/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const { colors: tokens, fontFamily: tokenFonts } = require("./tailwind.2027.config.js").theme;
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
        "!./src/layouts/2027/**",
        "!./src/partials/2027/**",
        "!./src/templates/2027/**",

    ],
    theme: {
        fontFamily: {
            plex: tokenFonts.sans,
            "plex-mono": tokenFonts.sans,
            rubik: ["'Rubik'", "sans-serif"],
            "bricolage-grotesque": ["'BricolageGrotesque'", "sans-serif"],
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
            colors: {
                "primary": tokens.tvgreen[600],
                "primary-darker": tokens.tvgreen[800],
                "primary-dark": tokens.black,
                "black": "#000000",
                // tvScientific 2025 Brand Colors
                "tvs": {
                    "green": tokens.tvgreen.DEFAULT,
                    "green-accessible": tokens.tvgreen[600],
                    "green-dark": tokens.tvgreen[800],
                    "green-light": tokens.tvgreen[200],
                    "green-pastel": tokens.grey["050"],
                    "black": tokens.black,
                    "grey": tokens.grey[350],
                    "grey-accessible": tokens.grey[350],
                    "grey-light": tokens.grey[100],
                    "grey-pastel": tokens.grey["050"],
                    "yellow": "#FFCD40",
                    "yellow-light": "#FFE6A0",
                    "white": "#FFFFFF",
                    // Holiday Trends Report 2026 accents (Figma: blues/medium, purples/medium)
                    "blue": "#55B8FF",
                    "purple": "#B888FF",
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
                lg: '0'
            },
        },
    },
    plugins: [

    ],
    // Old colour classes still stored in page content
    safelist: [
        ...require("./tailwind.legacy-safelist.json"),
        'text-primary',
        'text-primary-dark',
        'font-plex',
        'font-bricolage-grotesque',
        'font-rubik',
        'text-6xl',
        'text-7xl',
        'text-8xl',
        'text-9xl',
        'text-base',
    ],
};
