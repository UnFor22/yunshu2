// pages/book/book.js
import {fetch, showToast} from "../../utils/util.js"
const app = getApp()
Page({
  data: {
    titleId: "",
    article:{},
    title:"",
    bookId:"",
    catalog: [],
    isShow: false,
    isLoading: false,
    index: "",
    font:40
  },

  onLoad: function (options) {
    this.setData({
      titleId: options.id,
      bookId: options.bookId
    })
    this.getData()
    this.getCatalog()
  },

  getData(){
    this.setData({
      isLoading:true,
      isShow:false
    })
    fetch.get(`/article/${this.data.titleId}`).then(res =>{
      this.setData({
        article: res.data.article.content,
        title:res.data.title,
        isLoading:false,
        index: res.data.article.index
      })
    }).catch(err => {
      this.setData({
        isLodaing:false
      })
    })  
  },
  getCatalog(){
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      this.setData({
        catalog: res.data
      })
    })
  },
  toggleCatalog(){
    let isShow = !this.data.isShow
    this.setData({
      isShow
    })
  },
  handleGet(event){
    const id = event.currentTarget.dataset.id
    this.setData({
      titleId:id
    })
    this.getData()
  },
  // 上一章
  handlePrev(){
    let catalog = this.data.catalog;
    if(this.data.index -1<0){
      wx.showToast({
        title: '已经是第一章了',
      })
    }else{
      this.setData({
        titleId : catalog[this.data.index -1]._id
      })
      this.getData()
    }
  },
  // 下一章
  handleNext(){
    let catalog = this.data.catalog;
    if (catalog[this.data.index + 1]){
      this.setData({
        titleId : catalog[this.data.index + 1]._id
      })
      this.getData()
    }else{
      wx.showToast({
        title: '已经是最后一章',
      })
    }
  },
  // 字体放大
  handleAdd(){
    this.setData({
      font: this.data.font +2
    })
  },
  // 字体缩小
  handleReduce(){
    if(this.data.font<=24){
      wx.showModal({
        title: '提示',
        content: '字体太小影响视力',
        showCancel:false
      })
    }else{
      this.setData({
        font:this.data.font -2
      })
    }
  },


  onShareAppMessage: function () {
  
  }
})