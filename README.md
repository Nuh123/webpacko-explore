# webpacko-explore


webpack学习记录

必要关系（打包工具）

1. 浏览器端无法模块化
2. 浏览器无法使用最新的api
3. 前端工程化的发展中出现了一些新的‘格式’，浏览器也无法识别（只识别HTNL、css、js等）
4. 还可实现自动化和工程化



webpack基础

1. 基于node流，采用commonjs模式（require => moudle.explort)
2. webpack加载流程，从入口开始，区分依赖和代码，`递归`加载依赖,解决了浏览器端无法识别模块化后的代码的问题。
3. chunk 和budle的对比
chunk是代码块的意思
bundle是最终资源合集的意思
1个chunk可以是多个模块构成
这部分在后面再研究（代码分割）
**没有比较清楚的明白，暂时不细究。**
4. webpack只认识js和json格式的文件，如需识别其它格式，需配置对应的loader。


webpack 安装

1. 推荐项目安装。全局安装不会经常更新，局限了版本。
2. webpack4版本需要单独安装命令行
3. webpack可以通过@制定版本，不过属于node（npm）基础
4. webpack -v 可检查安装成功（全局）  未全局安装下只能npx webpack -v（会查找node_moudle => bin => webpack包）


webpack使用流程
 
1. 可以零配置使用，但一些路径也需要配合`默认设置`，其中特别之处，源代码为src目录下，源文件名为index.js，打包出的文件路径不用特殊设置，没有的话会自动创建，默认是dist目录下，为main.js。
2. 也可以自定义配置，需在根目录下添加`webpack.config.js`文件，基于node流的模块，暴露的为一个对象，具体细节见git记录。
3. 对于最基本的webpack打包来说，只需要设置正确的`entry`和`output`即可。
4. `module`是另一个关键参数，是一个对象，其中关键字段为rules，为数组，依赖配置一系列loader。loader 就是特定格式文件的解析器，需要通过loader来处理js不能识别的文件。
5. `plugins`字段为插件，用来在打包过程中做一些额外的工作。



loader和plugins对比
1. 作用不同，文件的解析器和额外工作格局。
2. 配置写法不同
3. 作用时间不同，特定文件解析时和整个生命周期中
4. 本质上，一个是实例（普通函数）， 一个是类。

常见loader

1. `css文件所需的loader`
css-loader  提取css文件中内容，再‘推到’js当中去。可通过配置参数实现css模块化。
style-loader 将被提取到js中的css再次提取出来，并插入到html当中去。

注：实际开发中css不会这么处理，起码使用less这种，还会单独合并css，并插入。

2. `‘现代’css写法 -- less-loader`
这里涉及一个顺序问题，less => css => style,但在loader配置时刚好反过来，具体原因看config文件。
这个loader的作用就是读取less文件中的css。
实测过一点，less不需要css-loader解析，也就是less-loader能完成css的工作。
但要实现css模块化还必须依赖css-loader。

3. `css前处理器 -- postcss-loader`
对css做一些处理，如压缩、添加浏览器前缀等
autoprefixer插件，实现前缀添加的工具。
具体使用见git记录
其它想起来再写

4. `资源处理类（主要是图片） --  file-loader`
就是统一管理图片类资源，包括打包后的命名、位置等。

5. `加强版file-loader  -- url-loader`
基本全覆盖file-loader功能，且能做一些额外的事。
尤其是base64处理图片，一般小于2kb（没有绝对标准）的图



常见的plugins

1. `HTML文件的自动化插入`
HTML-webpack-plugin  插件有一系列配置项

2. `自动清理dist目录的旧文件 ---  防缓存`
clean-webpack-plugin 基本上无需配置

devtool字段

source-map相关设置，详情见git

webpack-dev-server
基于express的一个小的小型服务器，提高开发效率。添加新命令后，走dev的话原先dist文件里面的东西会没掉，但是不影响开发，强行走内存。带热更新。
其中较为常见的功能如下
`open`  自动在浏览器打开打包后的文件
`port`  指定开发服务器（打包后项目启动）的端口
`porxy`  对于请求类的问题做额外处理，主要是跨域问题。
`bedore()和after()` 两个钩子函数，顾名思义在dev-server的特定阶段触发，可用来mock接口级别的一些问题。
