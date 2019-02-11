const fetch = require("../../../../config/ajax.js");
const { watch, computed } = require('../../../../utils/vuefy.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tab: [{ name: '全部', value: 0, isLoad: false }, { name: '待支付', value: 1, isLoad: false }, { name: '待收货', value: 2, isLoad: false }, { name: '已完成', value: 3, isLoad: false }, { name: '已取消', value: 4, isLoad: false }],
    tabIndex: 0
  },
  // tab点击
  tabClick: function (e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
  },
  //切换current改变
  currentChange: function (event) {
    this.setData({
      tabIndex: event.detail.current
    })
  },
  //请求数据
  getData: function () {
    fetch.ajax({ url: fetch.constant.shopcart }).then((res) => {
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    watch(this, {
      //监听index变化
      tabIndex: function (newVal) {
        if (!this.data.tab[newVal].isLoad){
          this.getData();
          this.setData({
            ['tab[' + newVal + '].isLoad']: true
          })
        }
      },
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