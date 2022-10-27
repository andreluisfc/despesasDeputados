const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: "/despesas",
  devServer: {
    allowedHosts: "all"
  },
  transpileDependencies: [
    'vuetify'
  ]
})
