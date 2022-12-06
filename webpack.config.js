const path = require('path');
const { CleanWebpackPlugin } = new require('clean-webpack-plugin')
const HtmlWebpackPlugin = new require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: "development",
    devtool: 'eval-source-map',
    entry: './src/javascripts/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'javascripts/[name]-[contenthash].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg)/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name]-[contenthash][ext]',
                },
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            }
                        }
                    }
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: __dirname + '/src/images/*',
                    to: 'images/[name][ext]',
                    noErrorOnMissing: true
                },
            ],
        }),
    ], devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        }
    },

}
