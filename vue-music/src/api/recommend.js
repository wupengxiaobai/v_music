import axios from 'axios'
import jsonp from 'common/js/jsonp'
import {
  commonParams,
  options
} from './config.js'

/**
 * 轮播数据获取
 */
export function getSlider() {
  //jsonp 参数 ?_=1553935046759&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uni: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

/**
 * 推荐歌单数据获取
 */
export async function getRecommend() {
  // ?picmid=1&rnd=0.5313599947702079&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&categoryId=10000000&sortId=5&sin=0&ein=19
  // const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  const data = Object.assign({}, commonParams, {
    picmid: 1,
    rnd: Math.random(),
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 19
  })

  let ret = await axios.get('/getRocommend', {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })

  return ret
}
