const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "/despesas",
  devServer: {
    allowedHosts: "all"
  },
  transpileDependencies: [
    'vuetify'
  ]
})
