import axios from 'axios';
// import jsonp from 'common/js/jsonp'
import {
  commonParams
  //   options
} from './config.js'

/**
 * 排行列表数据获取
 */
export async function getRanking() {
  // https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?_=1554015891754&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1
  let data = Object.assign(commonParams, {
    platform: 'h5',
    needNewCode: 1
  })

  let ret = await axios.get('/getRanking', {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })

  return ret
}
