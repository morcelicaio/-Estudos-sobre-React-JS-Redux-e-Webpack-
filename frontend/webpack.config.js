// Configurando o Build com webpack

const webpack = require('webpack')  //import do proprio webpack

//é o responsável por extrair toda a parte do css dos arquivos já compilados e aplicar o processo
// com style-loader e css-loader
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: './src/index.jsx',    
    output: {
        path: __dirname + '/public', 
        filename: './app.js'
    },
    devServer: {
        port: 8080,               // porta da aplicação    http://localhost:8080/
        contentBase: './public',  // pasta de onde ele irá ler o conteúdo
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],  // permite interpretar essas extensoes de arquivos.
        alias: {
            modules: __dirname + '/node_modules',  // referencia a pasta /node_modules  apenas por  'modules'
            jquery: 'modules/admin-lte/plugins/jQuery/jquery-2.2.3.min.js',   // referencia para o jquery 
            bootstrap: 'modules/admin-lte/bootstrap/js/bootstrap.js'          // referencia para o bootstrap
        }
    },
    plugins: [ 
        new webpack.ProvidePlugin({     // deixando o jquery disponível.
            $: 'jquery',                
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new ExtractTextPlugin('app.css')  // deixando o css disponível.
    ],
    module: {
        loaders: [{
            test: /.js[x]?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react'],               
                plugins: ['transform-object-rest-spread']   // faz a conversão para a versão antiga do javascript
            }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.woff|.woff2|.ttf|.eot|.svg|.png|.jpg*.*$/,
            loader: 'file'
        }]
    }
}