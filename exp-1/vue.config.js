const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: '/exp-tcp-au/simulation/',
    outputDir: 'public',
})
