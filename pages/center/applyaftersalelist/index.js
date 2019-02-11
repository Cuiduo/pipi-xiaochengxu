// pages/applyaftersalelist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderinfo:{
      creattime:'2018-01-31 14:50:46',
      goodslist:[
        {     imageurl:'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg',
          goodstitle: '科尔沁牛里脊111/袋新鲜内脏',
          price:'15.72',
          nums:"12345",
          status :0,
          statusshow:''
        },
        {
          imageurl: 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg',
          goodstitle: '科尔沁 牛里脊 500g/袋 新鲜内脏',
          price: '15.72',
          nums: "9992",
          status: 1,
          statusshow: '售后中'
        },
        {
          imageurl: 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg',
          goodstitle: '科尔沁 牛里脊 500g/袋 新鲜内脏',
          price: '15.72',
          nums: "22",
          status: 2,
          statusshow: '已售后'
        },
        {
          imageurl: 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg',
          goodstitle: '科尔沁 牛里脊 500g/袋 新鲜内脏',
          price: '15.72',
          nums: "222",
          status: 3,
          statusshow: '售后失败'
        }
      ]
    }
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

  // 点击申请售后
  applyaftersaletap: function (e) {
    console.log('点击申请售后')
    var index = e.currentTarget.dataset.index;
    var list = this.data.orderinfo.goodslist;
    if (index !== "" && index != null) {
      console.log('点击申请售后index')
      console.log(list[index])
      wx.navigateTo({
        url: '../applyaftersale/index',
      })
    }
  }
})