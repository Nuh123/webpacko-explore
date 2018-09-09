// node的文件路径处理模块
const path = require('path')
// 这个大驼峰法的原因是模块暴露的名字就是这样，结构只能照搬。
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackplugin    = require('html-webpack-plugin')
const webpack              = require('webpack')


console.log(CleanWebpackPlugin)
module.exports = {
    // 不常用字段，指定上下文，为相对路径的依据，默认为根目录即process.cwd()。
    context: process.cwd(),
    // 决定一些打包设置，已知就是生产模式会压缩代码。默认设置中是生产模式。
    // prouduction  生产
    // development  开发
    // none 不启用构建模式，默认production
    mode: 'development',
    // 入口，也就是编译的起点，相对路径即可，任何文件格式都可以，但需要设置对应的rules（webpack只认识js）。
    // str arr obj
    // entry: './src/index.js',
    // 非多入口，为多源文件，最终会是合并进一个main.js。
    // entry: ['./src/index.js','./src/other.js'],
    // 多入口的正确实现  
    // 多入口一定是多出口，多入口情况下不支持自定义指定出口文件名。
    entry: {
        index: './src/index.js',
        // other: './src/other.js'
    },
    // 出口，最终编译打包完的东西的存放设置。对象形式，包括路径和文件名。
    output: {
        // 这个地方需要注意，必须是绝对路径
        path: path.resolve(__dirname,'./dist'),
        // filename: 'index.js'
        // 多出口模式下使用占位符，源文件名相同。

        // 目前支持的占位符
        // hash  项目hash，主要防缓存，每次打包是weboack—cli里的，每次更新，可以设置长度，最长20位，默认20位，如filename: '[name]-[hash:16].js'。
        // chunkhash  代码块hash，主要是利用浏览器缓存，尽可能小的更新chunk。根据不同入口形成不同的代码chunck，只要对应入口的内容没有改变，chunckhash不变。
        // name 对应的entry的key
        // id
        filename: '[name].js'
    },
    // loader 特定格式的文档解析器。
    module: {
        rules: [
            {
                test: /\.css$/,
                // loader 执行顺序是从后往前
                // style-loader 从js中提取css，并把它放到html中去。
                // css-loader 把css的内容加到js当中去。
                // css in js大概就是
                use: ['style-loader','css-loader']
                
            },
            {
                test: /\.less$/,
                // loader 执行顺序是从后往前
                // 这里再强调下loader的顺序问题
                // less-loader  将less变为css，所以webpack处理还是需要依赖对应的cssloaser
                // css in js大概就是
                use: [
                    {
                        loader: 'style-loader',
                    },
                    // 每一个对应的loader也可配置为对象形式
                    // 该loader开启了css模块化 简单讲就是抽取公共css。
                    // {
                    //     loader : 'css-loader',
                    //     options: {
                    //         modules: true
                    //     }
                    // },
                    // 这里发现一个问题，less不需要css-loader。案例中简单的less可以正常打包style-loader必备。
                    {
                        loader: 'postcss-loader'
                    },
                    'less-loader'
                ]  
            },
            // {
            //     test: /\.(png)|(jpg?g) |(gif)$/,
            //     use : {
            //         loader : 'file-loader',
            //         options: {
            //             // 特殊占位符
            //             // [ext]   文件拓展名 但实测过，重命名的话必须显示调用拓展名占位符。
            //             name      : '[name]-[ext]-[hash:4].[ext]',
            //             outputPath: './images/'
            //         }
            //     }
            // },
            {
                test: /\.(png)|(jpg?g) |(gif)$/,
                use : {
                    loader : 'url-loader',
                    options: {
                        // 特殊占位符
                        // [ext]   文件拓展名 但实测过，重命名的话必须显示调用拓展名占位符。
                        name      : '[name]-[ext]-[hash:4].[ext]',
                        outputPath: './images/',
                        // 单位字节，也就是1024代表1k
                        // 字段表示小于下面数据的使用base64来处理图片
                        // 一定大小下，一般为2kb的图片使用bade64更好，太大的话增加的base64文本也是负担。
                        limit: 29*1024
                    }
                }
            }
        ]
    },

    // 快速关闭source-map  或者mode模式为开发时就是默认开启
    // source—map为显示开启
    // 具体键值有很多，详见文档。
    // 生产环境不建议开启source-map，正确设置mode即可。
    // 推荐配置
    // 开发  cheap-module-eval-sourceo-map
    // 生产  cheap-module-source-map
    devtool: 'cheap-module-eval-sourceo-map',
    
    // 开发用小型服务器,基于express
    // 需注意，热更新对于配置类的修改是无能为力的。
    devServer: {
        // 设置服务根目录，默认指向dist，且指向目录下的index.html
        // 可以是绝对路径或相对路径
        contentBase: path.resolve(__dirname,'./dist'),
        // 端口号
        port: 8080,
        // 是否在浏览器中打开
        open: true,
        // 代理器或拦截器，主要处理网络请求类问题
        // proxy: {
        //     '/api': {
        //         // 转发或者代理的目标  注意在实际请求处地址的写法要配合这里的转发规则。
        //         target: 'http://localhost:3000'
        //     }
        // },
        // before()和after()钩子函数就是在一定阶段会执行的函数，是webpack-dev-server中间件提供的。
        // 可以用来mock数据，但这种mock比较低效，仅仅是接口级别的mock，不是数据级别的，且目前的还是同源的接口，不涉及跨域。
        before(app,server) {
            // 此时不涉及什么跨域问题，接口是在8080端口下的
            app.get('/api/info',(req,res) => {
                res.json({
                    test: 'hello world'
                })
                console.log('数据被请求成功')
            })
        },
        // 热更新  准确的讲应该是热模块替换（更新）大名鼎鼎的HMR
        // 这个的使用步骤相对较多，安装webpack自带的插件后还需要在dev-server里面设置对应的属性
        // 这两个属性理解的不是很透彻，需要下来再研究研究。
        // 有几种情况没保存后会更新，但这个更新会有几种情况，浏览器完全刷新（用户行为清除），
        // hmr只替换对应的模块，用户行为保留，修改的代码生效。
        // 完全无视，但是这样对开发十分不友好。
        // 另抽离出的css文件对hmr也十分不友好，所以开发时不建议抽离css，即使用mini-css-extract-plugin插件（loader）。
        // 还有hmr除对css抽离不友好以外，还对contenthash和chunck不友好
        // 另对js的热更新以下也是不起作用的，但各大框架有自己对这部分支持的方案，以loader居多。
        // if(moduke.hot){
        //      module.hot.accept('./src/*',function() {})
        // }
        // 这样的处理显然是十分麻烦的
        // 默认开启
        hot: true,
        // 即便hmr没有生效，也不在保存文件时刷新浏览器。
        hotonly: true,
    },

    // 插件 额外工作 作用于整个生命周期
    // 插件使用前需要require引入，具体的使用看对应插件的文档，一般为实例化。
    plugins: [
        // 清除dist下的旧文件   -- 所有的
        new CleanWebpackPlugin(),
        // 自动导入html文件，且导入打包好的bundle
        // 问题 多入口情况下这种模版插入会插进一个html中
        new HtmlWebpackplugin({
            //  页面的标题 
            // 使用时需要特殊设置模版文件的title
            // 支持ejs的语法
            title   : '测试',
            template: './src/index.html',
            filename: 'index.html',
            // minify:  压缩 
            // 其它字段后续再拓展
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
}