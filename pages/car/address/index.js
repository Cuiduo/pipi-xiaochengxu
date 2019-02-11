// pages/car/address/index.js
const fetch = require("../../../config/ajax.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.adressList();
  },
  //获取收货地址列表
  adressList: function () {
    fetch.ajax({ url: fetch.constant.address, method: 'GET' }).then((res) => {
      this.setData({
        list: res
      })
      console.log(res)
    })
  },
  //进入编辑
  toEdit: function (e) {
    wx.navigateTo({
      url: '/pages/car/editAddress/index?id=' + e.currentTarget.dataset.id,
    })
  },
  //选择返回
  goBack: function () {
    let pages = getCurrentPages(); //当前页面
    let currPage = pages[pages.length - 1];    // 当前页面
    let prevPage = pages[pages.length - 2];    // 上一个页面
    prevPage.setData({
      //mydata: { a: 1, b: 2 }                       // 假数据
    })
    wx.navigateBack({
      delta: 1
    })
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

  }
})