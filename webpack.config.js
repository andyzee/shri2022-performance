const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
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
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: ImageMinimizerPlugin.loader,
                enforce: "pre",
                options: {
                    generator: [
                        {
                            preset: "webp",
                            implementation: ImageMinimizerPlugin.imageminGenerate,
                            options: {
                                plugins: ["imagemin-webp"],
                            },
                        },
                    ],
                },
            },
        ],
    },
    optimization: {
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            // Svgo configuration here https://github.com/svg/svgo#configuration
                            [
                                "svgo"
                            ],
                        ],
                    },
                },
                generator: [
                    {
                        // You can apply generator using `?as=webp`, you can use any name and provide more options
                        preset: "webp",
                        implementation: ImageMinimizerPlugin.imageminGenerate,
                        options: {
                            plugins: ["imagemin-webp"],
                        },
                    },
                ],
            }),
        ],
    },

};