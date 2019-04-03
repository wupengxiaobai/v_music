const path = require('path')
const axios = require('axios')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    before(app) {
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
      })
    }
  },
  //   webpack 配置相对路径
  chainWebpack(config) {
    config.resolve.alias
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))
  }
}
