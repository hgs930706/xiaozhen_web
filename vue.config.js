/*
 * @Author: ShenYuQiang
 * @Date: 2020-11-21 22:04:08
 * @LastEditors: ShenYuQiang
 * @LastEditTime: 2020-11-21 22:39:28
 * @FilePath: \yishangxiaozhen\vue.config.js
 */

module.exports = {
  devServer: {
    host: 'localhost',
    port: 3001,
    open: true,
    hot: true,
    // 内网穿透
    disableHostCheck: true
  },
  lintOnSave: false  
}
