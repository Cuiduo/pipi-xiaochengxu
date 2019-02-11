Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      text: '您认为智能食材表在使用时是否便捷？', multi: false, option: [{ text: '是，直观便捷', pitch: false }, { text: '不是，操作复杂', pitch: false }]
    }, {
        text: '货架中营养成分的标注(如高纤维、低热量、低脂肪等)对您选择商品有帮助吗？', multi: false, option: [{ text: '是', pitch: false }, { text: '没有', pitch: false }]
    }, {
        text: '您觉得商品下方的Tips小贴士有用吗？', multi: false, option: [{ text: '有用', pitch: false }, { text: '没有用', pitch: false }]
    }, {
        text: '我们准备推出更多食材表，您对哪方面比较感兴趣（可多选）', multi: true, option: [{ text: '过度用眼', pitch: false }, { text: '抵抗力降低', pitch: false }, { text: '色斑长痘', pitch: false }, { text: '易疲劳', pitch: false }, { text: '骨质疏松', pitch: false }]
    }, {
        text: '欢迎提出更多宝贵意见和建议，我们会努力改进', multi: false, option: [{ text: '是', pitch: false }, { text: '没有', pitch: false }]
    }]
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

  }
})