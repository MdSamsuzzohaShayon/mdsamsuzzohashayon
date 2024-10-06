const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.ts',
        output: {
            filename: isProduction ? 'bundle.[contenthash].js' : 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            assetModuleFilename: 'assets/img/[name].[hash][ext][query]'
        },
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'), // Serve from the 'dist' directory
            },
            compress: true,
            port: 9000,
            open: true,
            hot: true,
            client: {
                overlay: {
                    warnings: false,
                    errors: true, // Show errors if any
                },
            },
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.scss$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.css$/, // Handling CSS files (like bootstrap.min.css)
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    generator: {
                        filename: 'assets/img/[name].[hash][ext]',
                    },
                    type: 'asset/resource',
                },
                {
                    test: /\.html$/,
                    use: 'html-loader',
                },
                {
                    test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/fonts/[name].[hash][ext]',
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                inject: 'body',
            }),
            new MiniCssExtractPlugin({
                filename: isProduction ? '[name].[contenthash].css' : '[name].css',
            }),
            new CleanWebpackPlugin(),
        ],
    };
};
