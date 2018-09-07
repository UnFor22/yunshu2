// pages/myStudy/myStudy.js

import { fetch, login } from '../../utils/util.js'

Page({
  data: {
    bookData: [],
    titleId: "",
    bookId: "",
    // indicatorDots: true,
    isLoading: false,
    // pn: 1,
    // hasMore: true,
    // loadDone: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   bookId: options.id
    // })
    login()
    this.getContent()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  getContent() { 
    this.setData({
      isLoading: true,
    })
    fetch.get('/readList').then(res => {
      console.log(res)
      let arr = [...res.data]
      arr = arr.map(item => {
        item.title.percent = Math.round((item.title.index / item.title.total) * 100)
        return item
      })
      this.setData({
        bookData: arr,
        isLoading: false
      })
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },
  continueRead(){
    console.log(bookData)
    getContent()
    this.setData({
      titleId: this.bookData.data.book._id
    })
    wx.navigateTo({
      url: `/pages/book/book?id=${titleId}`,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})