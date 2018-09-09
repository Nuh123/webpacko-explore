const express = require('express')

const app = express()

app.get('/api/info',(req,res) => {
    res.json({
        test: 'hello world'
    })
    console.log('数据被请求成功')
})

app.listen('3000',() => {
    console.log('3000端口服务已启动')
})