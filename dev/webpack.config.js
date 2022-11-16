const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require('webpack')

const clientConfig = {
    // 一般在 package.json 中通过 --mode xxx 直接控制，该设置影响 process.env.NODE_ENV 的值
    mode: "development",
    // 常用的有 web、browserslist（默认会从 package.json 中读取）、node、electron-renderer、electron-main、nwjs
    // 建议 toC 项目使用 browserslist
    target: "web",
    entry: {
        // 入口1，’main‘ 是自定义的，后面所有的 [name] 都以它为值
        'main': path.resolve(__dirname, 'src/main.js')
        // 入口2
        // admin: xxxxx
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // publicPath:'a/b', //所有资源注入前会加上这个公共路径，该设置只影响注入，不影响文件实际位置
        filename: '[name].[chunkhash:6].js', // [name] 由 entry 决定，例如 entry:{ main:... } 输出结果就是 main.ja7d89a.js
        assetModuleFilename: 'assets/[name].[chunkhash:6].[ext]', // [name] 由源文件名决定，如果不声明静态资源的文件名，webpack 会自动使用内部规则，使用哈希做文件名
        clean: true, //每次构建前是否清空目标文件夹
    },
    plugins:[
        // HTMLWebpackPlugin 会自动将生成的 JS CSS 引入到 html 文件中，具体配置见 NPM
        // 如果有多个 html 需要处理，就调用多次 new HTMLWebpackPlugin(xxx)，仅需要多个测试 html 时使用；多个项目时想同时启动时，建议使用多配置文件，比多入口多 html 更简洁
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            filename: 'index.html', // 也可以使用 [name].html
            chunks:['main'] // 对应入口名，如不指定，默认会将所有入口的打包结果都注入
        }),
        // 官方单文件组件插件
        new VueLoaderPlugin(),
        // Vue3 要求的，否则会一直提示要你 bla bla bla
        new DefinePlugin({
            __VUE_OPTIONS_API__: true, // 是否打包选项 API，如果完全不使用选项式开发才可以 false。default: true
            __VUE_PROD_DEVTOOLS__: false // default: false
        }),
    ],
    // loaders
    module:{
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // assets，将匹配到的文件 按静态资源(type: 'asset/resource')处理，该 type 是 webpack 内置功能
            // Files will be emitted to the output directory and their paths will be injected into the bundles, besides, you can customize outputPath and publicPath for them.
            {
                test: /\.(png|jpe?g|svg|webp|gif|mp3|mp4|webm|ttf|woff2?)$/,
                type: 'asset/resource',
                parser: {
                    dataUrlCondition: {
                        maxSize: 100 * 1024 // 对小于 100kb 的资源使用 base64 处理
                    }
                },
                // 会覆盖 output.assetModuleFilename 的值，一般用于更为详细的静态资源处理，例如图片都放到 images 下，html 放到 static 下
                generator:{
                    filename:'assets/[name].[contenthash:6].[ext]',
                    //emit: true, // 默认为 true，将静态资源复制到 output 指定目录；如果使用服务端渲染，则需要将该项设为 false
                },
            },
            // js for babel，babel 基础处理内容有限，对 promise 等不会处理，想更强化的兼容性，需要进一步使用 @babel/polyfill
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除 node_modules 里的 JS 文件
                use: {
                    loader: 'babel-loader?cacheDirectory=true', // 通过 ? 号可以给 loader 添加参数，这里让 babel 使用缓存，可提高处理速度（包括devServer）
                    options: { presets: ['@babel/preset-env'] }
                }
            },
            // css sass scss, this will apply to both plain `.scss` files and `<style lang="scss">` blocks in `.vue` files
            // 如果项目没有 vue，可用 'style-loader' 替换 'vue-style-loader'
            {
                test: /\.(s[ac]|c)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                    // postcss 用于处理 css 的兼容问题，类似于 babel，toC 必备，并且会在开发过程中提供必要的提醒（某些 CSS 错误，浏览器支持度不一样）
                    {
                        loader:'postcss-loader',
                        options:{
                            postcssOptions:{
                                parser: require('postcss-comment'),
                                plugins:[
                                    require('autoprefixer'), // 智能添加浏览器前缀
                                    require('postcss-preset-env'), // 根据 browserlist 处理 css 兼容性
                                ]
                            }
                        }
                    }
                ]
            },
        ]
    },
    // webpack 处理 import 时的配置
    resolve: {
        // webpack 默认只将 .js .mjs 等当作模块，通过 resolve 配置使其能将更多类型文件和目录识别为模块；注意“模块”与“静态资源”的区别
        extensions: ['.js', '.vue', '.scss',  '.json', '.html', '.ts', '.jsx', '.tsx'],
        // 默认就是 ['index']，如果想用 main 做模块目录入口，只需在 'index' 前添加 'main' 即可
        mainFiles: ['index'],
        // 在模块引入过程中，为指定路径定义别名，可以很方便地用绝对路径替代相对路径
        alias:{ '@': path.resolve(__dirname, 'src') }
    },
    // 当执行出现错误时，能准确找到出现错误的文件
    devtool: 'inline-source-map',
    devServer: {
        port: 9500,
        open: true,
        hot: true,
        // Router 用的，让 devServer 404错误时返回入口 html，不解释了
        historyApiFallback: true,
        https: false, // 让 devServer 可以通过 https 访问
    },
    // 控制打包过程中的 log 输出，功能非常多，这里只提供一个最简单的用例
    // Precisely control what bundle information gets displayed.if you don't want to use quiet or noInfo because you still want some bundle information.
    stats: {
        assets: false,
        modules: false,
    }
}
// 可以通过多个配置文件，一次性开启多个服务，
module.exports = [ clientConfig ]