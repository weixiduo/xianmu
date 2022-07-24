const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:{
      '/api':{
        target:"http://gmall-h5-api.atguigu.cn",
        // target:"http://39.98.123.211:8416",
        // pathRewrite:{'^/api':''}
      }
    }
  }
})

