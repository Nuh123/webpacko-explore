// import css from './index.css'
// 现实中是这样的,但这样在没有配loader的情侣下是会报错的
import './index.css'
// 因为webpack基于node，所以只认识js和json格式，是没法处理css格式的
console.log('hello webpack')