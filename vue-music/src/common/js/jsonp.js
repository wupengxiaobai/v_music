/**
 * jsonp 依赖最简介绍
 * 接受三个参数
 * param1 => 路径
 * param2 => 配置
 * param3 => 回调参数(err,data) --> err错误, 无错误时为null, data 数据
 */
import originJSONP from 'jsonp'


/**
 * 重写依赖jsonp -> promise 化
 * @param {*} url 纯净的url地址
 * @param {*} data 需要拼接到url地址上的数据
 * @param {*} option 
 */
export default function json(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
//  处理 query 参数
function param(data) {
  let url = '';
  for (let key in data) {
    let value = data[key] !== undefined ? data[key] : ''
    url += `&${key}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
