/*
 * @Author: ShenYuQiang
 * @Date: 2020-11-21 22:04:08
 * @LastEditors: ShenYuQiang
 * @LastEditTime: 2020-11-21 22:39:28
 * @FilePath: \yishangxiaozhen\vue.config.js
 */

module.exports = {
  devServer: {
    host: '47.105.143.238',
    port: 3001,
    open: true,
    hot: true,
    // 内网穿透
    disableHostCheck: true
  },
  // 取消eslint校验代码 
  lintOnSave: false  
}
