const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    return {
        mode: 'development',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: env.production ? 'system' : '' //打包格式, system模块
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: { loader: 'babel-loader' },
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            // 生产环境下才生成html文件
            !env.production &&
                new HtmlWebpackPlugin({
                    template: './public/index.html'
                })
        ].filter(Boolean),
        // 如果是生产环境，就将react和react-dom设置为外部依赖
        externals: env.production ? ['react', 'react-dom'] : []
    };
};
