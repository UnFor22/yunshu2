// pages/user/user.js
import { fetch, login } from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    collections: [],
    isLoading: false
  },

  onLoad: function (options) {
    login()
    // getData()
  },
  getData(){
    login().then(res =>{
      console.log(res)
    })
  },
  toggleCollect(){
    wx.navigateTo({
      url: '/pages/collection/collection'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})