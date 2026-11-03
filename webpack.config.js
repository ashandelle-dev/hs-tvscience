const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Upload dist/ to HubSpot with the hs CLI (see npm scripts in package.json).
module.exports = {
    // "main"      -> legacy site bundle: css/styles.css + js/cli-main.js (tailwind.config.js)
    // "2027"      -> 2027 reskin bundle: css/2027/site.css + js/2027/site.js (tailwind.2027.config.js),
    //                loaded only by layouts/2027/base.html
    entry: {
        main: "./src/index.js",
        "2027": "./src/index-2027.js",
    },
    output: {
        filename: ({ chunk }) => (chunk.name === "main" ? "js/cli-main.js" : `js/${chunk.name}/site.js`),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/images", to: "images" },
                { from: "src/modules", to: "modules" },
                { from: "src/templates", to: "templates" },
                { from: "src/layouts", to: "layouts" },
                { from: "src/partials", to: "partials" },
                { from: "src/sections", to: "sections" },
                { from: "src/fonts", to: "fonts" },
                { from: "src/css/tvscientific-state-of-performance-interactions.css", to: "css/tvscientific-state-of-performance-interactions.css" },
                { from: "src/css/fonts.css", to: "css/fonts.css" },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: ({ chunk }) => (chunk.name === "main" ? "css/styles.css" : `css/${chunk.name}/site.css`),
        }),
    ],
};
