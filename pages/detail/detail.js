// pages/bookdetail/detail.js
import {fetch} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId:"",
    bookData: {},
    isLoading :false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookId:options.id
    })
    this.getData()
  },
  getData(){
    this.setData({
      isLoading:true
    })
    fetch.get(`/book/${this.data.bookId}`).then(res =>{
      this.setData({
        bookData: res,
        isLoading:false
      })
    }).catch(err =>{
      this.setData({
        isLoading:false        
      })
    })
  },
  jumpCatalog(){
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.bookId}`,
    })
  },
  onShareAppMessage: function () {
    return {
      title: this.data.bookData.data.title,
      path: `/pages/details/details?id=${this.data.bookId}`,
      imageUrl: this.data.bookData.data.img
    }
  }
})