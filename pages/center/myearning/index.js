// pages/myearning/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname :'张三',
    totalbalance :'37999992.00',
    avalabelcash: '10086.00',
    value1: '0',
    value2: '00',
    currentindex : 0,
    hasreturnlist:[
      {
        orderid:'683453631008',
        creattime:'2019-01-15 21:16:30',
        changenum :'13.50'
      },
      {
        orderid: '683453631008',
        creattime: '2019-01-15 21:16:30',
        changenum: '33.50'
      },
      {
        orderid: '683453631008',
        creattime: '2019-01-15 21:16:30',
        changenum: '333.50'
      },
      {
        orderid: '682253631008',
        creattime: '2019-01-15 21:16:30',
        changenum: '3333.50'
      },
      {
        orderid: '682234536310',
        creattime: '2019-01-15 21:16:30',
        changenum: '33333.50'
      },
      {
        orderid: '683453631008',
        creattime: '2019-01-15 21:16:30',
        changenum: '333333.50'
      },
    ],
    futurereturnlist:[
      {
        orderid: '683453631008',
        creattime: '2019-01-15 21:16:30',
        changenum: '663.50'
      },
      {
        orderid: '683453631008',
        creattime: '2019-01-15 21:16:30',
        changenum: '13.50'
      },
      {
        orderid: '683453631008',
        creattime: '2019-01-15 21:16:30',
        changenum: '137.50'
      },
      {
        orderid: '683453631008',
        creattime: '2019-01-15 21:16:30',
        changenum: '13333.50'
      }
    ]
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
  //提现
  getcashtap() {
    wx.navigateTo({
      url: "../getcash/index"
    })
  } ,
  //提现列表
  getcashlisttap() {
    wx.navigateTo({
      url: "../getcashlist/index"
    })
  },
  //点击已返收益
  hasreturn(){
   this.setData({
     currentindex:0
   })
  },
  //点击预计收益
  futurereturn(){
    this.setData({
      currentindex: 1
    })
  }
  
})