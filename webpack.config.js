const HubSpotAutoUploadPlugin = require("@hubspot/webpack-cms-plugins/HubSpotAutoUploadPlugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ({ account, autoupload }) => ({
    entry: "./src/index.js",
    output: {
        filename: "js/cli-main.js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                    },
                ],
            },
        ],
    },

    plugins: [
        //new HubSpotAutoUploadPlugin({
         //   account,
        //    autoupload,
         //   src: "dist",
        //    dest: "tvScientific\ 2022\ Atlas\ Pro/cli-build",
        //}),
        new CopyWebpackPlugin({
            patterns: [
          
                { from: "src/images", to: "images" },
                { from: "src/modules", to: "modules" },
                { from: "src/templates", to: "templates" },
                { from: "src/layouts", to: "layouts" },
                { from: "src/partials", to: "partials" },
                { from: "src/sections", to: "sections" },
                // { from: "src/macros", to: "macros" },
                //{ from: "src/css/tvscientific-home-interactionsV2.css", to: "css/tvscientific-home-interactionsV2.css"},
                { from: "src/css/tvscientific-state-of-performance-interactions.css", to: "css/tvscientific-state-of-performance-interactions.css"},
                //{ from: "src/css/components.css", to: "css/components.css"},
                //{ from: "src/css/tvscientific-state-of-performance-components.css", to: "css/tvscientific-state-of-performance-components.css"},
                //{ from: "src/css/normalize.css", to: "css/normalize.css"}
            ],
        }),
        new MiniCssExtractPlugin({
            filename: "css/styles.css",
        }),
    ],
});
