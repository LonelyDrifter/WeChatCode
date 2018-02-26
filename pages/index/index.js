//index.js
//获取应用实例
let QR=require('../../utils/qrcode.js')

Page({
  data: {
    placeholder: "https://www.baidu.com"
  },
  onLoad: function () {
    //生命周期函数--监听页面加载
    let size = this.setCanvasSize()
    let url = this.data.placeholder
    // console.log(url)
    // console.log(size.w)
    // console.log(size.h)
    this.createQRcode(url,'mycanvas',size.w,size.h)
  },
  createQRcode(url,canvasId,canvaWidth,canvasHeight){
    QR.qrApi.draw(url, canvasId, canvaWidth, canvasHeight)
  },
  setCanvasSize(){
    let size = {}
    let res = wx.getSystemInfoSync()
      console.log(res)
    let scale=686/750
    let width = res.windowWidth*scale
    // console.log(width)
    let height = width
    size.w = width
    size.h =height
    return size
  },
  formSubmit(e){
    let url = e.detail.value.url||  this.data.placeholder
    wx.showToast({
      title: '二维码生成中',
      icon:'loading',
      duration:2000
    })
    let that = this
    let timer = setTimeout(()=>{
      let size = that.setCanvasSize()
      let url = this.data.placeholder
      console.log(url)
      that.createQRcode(url, 'mycanvas', size.w, size.h)
      wx.hideToast()
      clearTimeout(timer)
    },2000)
  }
})
