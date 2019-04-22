import axios from 'axios';
import jsonp from 'common/js/jsonp'
import {
  commonParams,
  options
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

// 获取排行列表详情数据
//  https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg
//  ?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&topid=26&needNewCode=1&uin=0&tpl=3&page=detail&type=top&platform=h5&jsonpCallback=__jp1
export function getMusicList(topId) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  let data = Object.assign({}, commonParams, {
    format: 'jsonp',
    topid: topId,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
  })

  return jsonp(url, data, options)
}



/*
https://u.y.qq.com/cgi-bin/musicu.fcg?_=1555053643296
{
  "req_0": {
    "module": "track_info.UniformRuleCtrlServer",
    "method": "GetTrackInfo",
    "param": {
      "ids": [230956311, 230253171, 230902894, 230437514, 231282176, 230972660, 231047975, 231062643, 229725489, 230767707, 230973317, 229658902, 230421649, 230679137, 229661472, 230560466, 230215198, 230974471, 230766575, 231287862, 230903350, 230974747, 229691715, 231007992, 230946640, 231047940, 231086095, 230215200, 229750788, 231009393, 230932779, 230544400, 231258303, 230975179, 230432837, 230722325, 230464968, 229912326, 230215194, 230465012, 231257518, 229631228, 229725486, 230766576, 230861918, 230618829, 230957047, 231070169, 230201546, 230897824],
      "types": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  "comm": {
    "g_tk": 5381,
    "uin": 0,
    "format": "json",
    "ct": 23,
    "cv": 0
  }
} */
