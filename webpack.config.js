// node的文件路径处理模块
const path = require('path')
// 这个大驼峰法的原因是模块暴露的名字就是这样，结构只能照搬。
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
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
        other: './src/other.js'
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
                loader: ['style-loader','css-loader']
                
            },
        ]
    },
    
    // 插件 额外工作 作用于整个生命周期
    // 插件使用前需要require引入，具体的使用看对应插件的文档，一般为实例化。
    plugins: [
        new CleanWebpackPlugin()
    ]
}