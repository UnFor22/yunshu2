// pages/catalog/catalog.js
import {fetch} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId:"",
    catalogData:[]
  },

  onLoad: function (options) {
    this.setData({
      bookId:options.id
    })
    this.getData()
  },
  
  getData(){
    fetch.get(`/titles/${this.data.bookId}`).then(res=>{
      this.setData({
        catalogData: res.data
      })
    })
  },
  onShareAppMessage: function () {
  
  }
})