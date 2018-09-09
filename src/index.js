// import css from './index.css'
// 现实中是这样的,但这样在没有配loader的情侣下是会报错的
import './css/index.css'
import css from './css/index.less'
// 大意就是在js当中操作css，将css类名作为某个对象的键名
// vue react 中也有对应的解决方案
console.log(css)
// 因为webpack基于node，所以只认识js和json格式，是没法处理css格式的
console.log('hello webpack') 


import pic from './image/demo.png'
var img     = new Image()
    img.src = pic
    // console.log(pic)
var el = document.getElementsByClassName('image')[0]
el.append(img)


import axios from 'axios'

axios.get('/api/info')
.then (res => {
    console.log(res.data)
})
.catch(err => {
    console.log('出错了，错误为'+ err)
})

const arrtest = [new Promise(() => {}),new Promise(() => {})]