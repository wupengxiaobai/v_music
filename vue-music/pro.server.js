var express = require('express')
var config = require('./vue.config')
var axios = require('axios')
var app = express()
// 获取推荐数据
app.get('/getRocommend', async (req, res) => {
  let ret = await axios({
    method: 'get',
    params: req.query,
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    }
  }).then(res => {
    return res.data
  }).catch(err => {
    console.log('err--', err)
  })
  res.send(ret)
});
// 获取排行榜单数据
app.get('/getRanking', async (req, res) => {
  let ret = await axios({
    method: 'get',
    params: req.query,
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    }
  }).then(res => {
    return res.data
  }).catch(err => {
    console.log('err--', err)
  })
  res.send(ret)
});
// 获取歌手专辑数据
app.get('/getSingerZJ', async (req, res) => {
  let ret = await axios({
    method: 'get',
    params: req.query,
    url: 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  }).then(res => {
    return res.data
  }).catch(err => {
    console.log('err--', err)
  })
  res.send(ret)
});
// 获取歌词数据
app.get('/getLyric', async (req, res) => {
  let ret = await axios({
    method: 'get',
    params: req.query,
    url: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    }
  }).then(res => {
    return res.data
  }).catch(err => {
    console.log('err--', err)
  })
  res.send(ret)
});
//  获取歌单详情数据
app.get('/getDisc', async (req, res) => {
  let ret = await axios({
    method: 'get',
    params: req.query,
    url: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    }
  }).then(res => {
    return res.data
  }).catch(err => {
    console.log('err--', err)
  })
  res.send(ret)
});
//  获取搜索详情数据
app.get('/getSearchData', async (req, res) => {
  let ret = await axios({
    method: 'get',
    params: req.query,
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg',
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    }
  }).then(res => {
    return res.data
  }).catch(err => {
    console.log('err--', err)
  })
  res.send(ret)
});
//  获取歌曲详情
app.get('/getSongDetail', async (req, res) => {
  let ret = await axios({
    method: 'get',
    params: req.query,
    url: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    }
  }).then(res => {
    return res.data
  }).catch(err => {
    console.log('err--', err)
  })
  res.send(ret)
});

app.use(express.static('./dist'))

var port = process.env.PORT || config.devServer.port
module.exports = app.listen(port, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('listen in' + port + '...')
})
