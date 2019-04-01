import jsonp from 'common/js/jsonp'
import {
  commonParams,
  options
} from './config'

export function getSinger() {
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  let data = Object.assign({}, commonParams, {
    g_tk: 1928093487,
    notice: 0,
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return jsonp(url, data, options)
}
