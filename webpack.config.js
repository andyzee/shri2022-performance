const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const dist_dir_name = 'docs';
const src_dir_name = 'src';

module.exports = {
    mode: 'production',
    entry: {
        script: path.resolve(__dirname, src_dir_name, "scripts.js"),
    },
    output: {
        path: path.resolve(__dirname, dist_dir_name),
        clean: true,

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, src_dir_name, "index.html")
        }),
        new MiniCssExtractPlugin(),
        new HtmlCriticalWebpackPlugin({
            base: path.resolve(__dirname, dist_dir_name),
            src: 'index.html',
            dest: 'index.html',
            inline: true,
            minify: true,
            extract: true,
            width: 1920,
            height: 1080,
            penthouse: {
                blockJSRequests: false,
            }
        })
    ],
    module: {
        rules: [
            {
                test: /.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset",
            },
        ],
    },
};