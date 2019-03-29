const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  //   webpack 配置相对路径
  chainWebpack(config) {
    config.resolve.alias
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))
  }
}
