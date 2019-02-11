// pages/getcash/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avalabelcash: '10086.00',
    value1: '0',
    value2: '00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.changeSize();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  //处理可提现余额样式
  changeSize: function () {
    var that = this;
    var length = that.data.avalabelcash.length;
    var index = that.data.avalabelcash.indexOf('.');

    that.setData({
      value1: that.data.avalabelcash.substr(0, index - 1)
    })
    that.setData({
      value2: that.data.avalabelcash.substr(index + 1)
    })
  },
  /**
   * 点击提现按钮
   */
  getcashtap(){
   
   wx.showToast({
     title: '提现申请已提交',
     icon: 'success',
     duration:2000
   }),
   setTimeout(function(){
    wx.navigateTo({
      url: '../getcashsuccess/index',
    })
   },2000)
  }
})