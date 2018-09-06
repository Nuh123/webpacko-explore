# webpacko-explore


webpack学习记录

必要关系（打包工具）

1. 浏览器端无法模块化
2. 浏览器无法使用最新的api
3. 前端工程化的发展中出现了一些新的‘格式’，浏览器也无法识别（只识别HTNL、css、js等）



webpack基础

1. 基于node流，采用commonjs模式（require => moudle.explort)
2. webpack加载流程，从入口开始，区分依赖和代码，`递归`加载依赖,解决了浏览器端无法识别模块化后的代码的问题。
3. chunk 和budle的对比
chunk是代码块的意思
bundle是最终资源合集的意思
1个chunk可以是多个模块构成
这部分在后面代码分割的时候会再讲
**没有比较清楚的明白，暂时不细究。**
4. webpack只认识js和json格式的文件，如需识别其它格式，需配置对应的loader。


webpack 安装

1. 推荐项目安装。全局安装不会经常更新，局限了版本。
2. webpack4版本需要单独安装命令行
3. webpack可以通过@制定版本，不过属于node（npm）基础
4. webpack -v 可检查安装成功  还有npx webpack -v


webpack基本使用流程
 
1. 可以零配置使用，但一些路径也需要配合`默认设置`，其中特别之处，源代码为src目录下，源文件名为index.js，打包出的文件路径不用特殊设置，没有的话会自动创建，默认是dist目录下，为main.js。
2. 也可以自定义配置，需在根目录下添加`webpack.config.js`文件，基于node流的模块，暴露的为一个对象，具体细节见git记录。
3. 对于最基本的webpack打包来说，只需要设置正确的`entry`和`output`即可。
4. `module`是另一个关键参数，是一个对象，其中关键字段为rules，为数组，依赖配置一系列loader。loader 就是特定格式文件的解析器，需要通过loader来处理js不能识别的文件。


常见loader

1. `css文件所需的loader`
css-loader  提取css文件中内容，再‘推到’js当中去。
style-loader 将被提取到js中的css再次提取出来，并插入到html当中去。

注：实际开发中css不会这么处理，起码使用less这种，还会单独合并css，并插入。


