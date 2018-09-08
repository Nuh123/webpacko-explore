const autoprefixer = require('autoprefixer')
// 属于后处理器 基于autoprefixer插件。
module.exports = {
    plugins: [
        // 单个兼容写法
        // autoprefixer(
        //     'IE 10'
        // )
        autoprefixer(
            // 多添加形式
            {
                overrideBrowserslist: [
                    // 最新的两个版本的浏览器   和市场大于1%的浏览器
                    'last 2 versions',
                    '>1%'
                ]
            }
        )
    ]
}