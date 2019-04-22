import axios from 'axios';
import jsonp from 'common/js/jsonp'
import {
  commonParams,
  options
} from './config.js'


//  获取热门搜索
export function getHotKey() {
  //  https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&uin=0&needNewCode=1&platform=h5&jsonpCallback=__jp0
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  let data = Object.assign({}, commonParams, {
    format: 'jsonp',
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

//  搜索数据抓取
export async function search(keyworld) {
  //    https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?is_xml=0&key=%E9%82%93%E7%B4%AB%E6%A3%8B&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0
  let url = '/getSearchData';
  let data = {
    is_xml: 0,
    key: keyworld,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0
  }

  let ret = axios.get(url, {
    params: data
  }).then(res => {
    return res.data
  })

  return ret
}

//  获取某歌的所有播放列表
//  https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?_=1555165505977&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=%E9%82%93%E7%B4%AB%E6%A3%8B&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all
export async function getSongDetail(name) {
  let url = '/getSongDetail'; //  'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  let data = Object.assign({}, commonParams, {
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    w: name,
    zhidaqu: 1,
    catZhida: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: 20,
    n: 20,
    p: 1,
    remoteplace: 'txt.mqq.all'
  })

  let ret = await axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res)
  })

  return ret
}
