/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [require("./tailwind.2027.config.js")],
    important: ".tvs-2027",
    corePlugins: { preflight: false },
    content: [
        "./src/partials/2027/**/*.html",
        "./src/modules/2027/site-header.module/*.html",
        "./src/modules/2027/site-footer.module/*.html",
        "./src/modules/news-blog-cards.module/*.html",
        "./src/js/2027/site-header.js",
    ],
};
