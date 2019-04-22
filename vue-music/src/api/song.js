import {
  commonParams
} from './config'
import jsonp from 'common/js/jsonp'

import axios from 'axios'

// 获取歌曲的vkey
export function getSongVkey(songmid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = Object.assign({}, {
    callback: 'musicJsonCallback',
    loginUin: 3051522991,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    guid: 5124515117,
    songmid: songmid,
    filename: `C400${songmid}.m4a`
  })

  return jsonp(url, data)
}

export async function getLyric(mid) {
  let url = "/getLyric";
  //   https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg
  //?-=MusicJsonCallback_lrc&pcachetime=1554780332658&songmid=001KGKgE2l4mXQ&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    g_tk: 5381,
    pcachetime: +new Date(),
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0
  })

  let ret = await axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })

  return ret
}
