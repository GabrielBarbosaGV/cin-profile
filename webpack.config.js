const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Preprocess = require('svelte-preprocess');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.ts',
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte')
        },
        extensions: [
            '.mjs',
            '.js',
            '.svelte',
            '.ts'
        ],
        mainFields: ['svelte', 'browser', 'module', 'main']
    },
    module: {
        rules: [
            {
                test: /.svelte$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        preprocess: Preprocess({})
                    }
                }
            },
            {
                test: /.ts$/,
                use: 'ts-loader'
            },
            {
                test: /.(jpg)$/,
                use: 'file-loader'
            },
            {
                test: /.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}
