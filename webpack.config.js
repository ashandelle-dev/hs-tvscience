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
        new HubSpotAutoUploadPlugin({
            account,
            autoupload,
            src: "dist",
            dest: "tvScientific\ 2022\ Atlas\ Pro/cli-build",
        }),
        new CopyWebpackPlugin({
            patterns: [
          
                { from: "src/images", to: "images" },
                { from: "src/modules", to: "modules" },
                { from: "src/templates", to: "templates" },
                { from: "src/layouts", to: "layouts" },
                { from: "src/partials", to: "partials" },
                { from: "src/sections", to: "sections" },
                // { from: "src/macros", to: "macros" },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: "css/styles.css",
        }),
    ],
});
