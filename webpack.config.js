const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/* Alias */
const alias = {
    "@elements": path.resolve(__dirname, 'src/elements/'),
    "@components": path.resolve(__dirname, 'src/components/'),
    "@containers": path.resolve(__dirname, 'src/containers/'),
    "@pages": path.resolve(__dirname, 'src/pages/'),

    "@router": path.resolve(__dirname, 'src/routes/'),
    "@context": path.resolve(__dirname, 'src/context/'),
    "@public": path.resolve(__dirname, 'src/public/'),

    "@icons": path.resolve(__dirname, 'src/assets/icons/'),
    "@logos": path.resolve(__dirname, 'src/assets/logos/'),
    "@styles": path.resolve(__dirname, 'src/sass/'),
    
    "@data": path.resolve(__dirname, 'src/data/'),
}

/* Loaders modulados */
const babel = {
    test: /\.(js|jsx)$/,
    include: path.resolve(__dirname, 'src'),
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
        presets: [
            [
                '@babel/preset-react',
                {
                    runtime: 'automatic' // 'classic'
                }
            ] 
        ]
    }
}

const files = {
    test: /\.(png|svg|jpe?g|gif)$/i,
    loader: 'file-loader',
    include: [
        path.resolve(__dirname, 'src', 'assets'),
        path.resolve(__dirname, 'src', 'public')
    ],
    options: {
        name: '[path][name].[ext]',
    },
}

const mp4 = {
    test: /\.mp4$/,
    use: 'file-loader?name=videos/[name].[ext]',
}

const sass = {
    test: /\.css|.scss$/,
    include: [
        path.resolve(__dirname, 'src', 'sass')
    ],
    use: ['style-loader', 'css-loader', 'sass-loader']
}

/* ------------ . ------------ */
const rules = [
    babel,
    sass,
    files,
    mp4
]

/* -------------------- *\
    MAIN CONFIGURATION
\* -------------------- */
module.exports = ({mode}) => {
    const isProduction = mode === 'production'
    return {
        entry: './src/index.js',
        output: {
            filename: isProduction 
            ? '[name].[contentHash].js' 
            : 'main.js',
            path: path.resolve(__dirname, 'production'),
            publicPath: '/'
        },

        /*-------
        Loaders
        -------*/
        module: {
            rules
        },

        resolve: {
            alias
        },

        /*------
        Plugins
        -------*/
        plugins: [
            new HtmlWebpackPlugin({
                inject : true,
                /* favicon: "./src/public/favicon.png", */
                template: './src/public/index.html',
                filename: './index.html'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
        ],

        /*--------- 
        Performance
        -----------*/
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },

        /*-----
        Server
        ------*/
        devServer: {
            open: false,
            port: 3000,
            compress: true,
            client: {
                overlay: {
                    errors: true,
                    warnings: false
                }
            }
        },

        devtool: 'source-map'
    }
}