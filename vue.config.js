const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
      proxy: {
          '/api': {
              target: 'http://localhost:9311',//这里填入你要请求的接口的前缀
              ws:true,//代理websocked
              changeOrigin:true,//虚拟的站点需要更管origin
              secure: false,                   //是否https接口
              pathRewrite:{
                  '^/api':''//重写路径
              }
          }
      }
  }
}