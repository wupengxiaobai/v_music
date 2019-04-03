import jsonp from 'common/js/jsonp'
import axios from 'axios'
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

// 歌手详情页歌单数据
export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    g_tk: 1928093487,
    singermid: singerId
  })

  return jsonp(url, data, options)
}

//  歌手详情页专辑数据
export async function getSingerZJData(singerId) {
  //   let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  let data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      "comm": {
        "ct": 24,
        "cv": 0
      },
      "singerAlbum": {
        "method": "get_singer_album",
        "param": {
          "singermid": singerId,
          "order": "time",
          "begin": 0,
          "num": 5,
          "exstatus": 1
        },
        "module": "music.web_singer_info_svr"
      }
    }
  })

  let ret = await axios.get('/getSingerZJ', {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })

  return ret
  //   return jsonp(url, data, options)
}
//  歌手详情页mv数据
