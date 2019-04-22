/**
 * 重写webpack配置文件
 */
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    devServer: {
        port: 8080
    },
    //  快速路径入口配置
    chainWebpack(config) {
        config.resolve.alias
            .set('common', resolve('src/common'))
            .set('components', resolve('src/components'))
            .set('api', resolve('src/api'))
    }
}