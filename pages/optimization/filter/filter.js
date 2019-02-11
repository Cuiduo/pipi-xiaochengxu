const api = require('../../../config/api.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //当前页签
    curTab: 0,
    //当前选中症状
    curSymptom: {},
    //症状列表
    symptoms: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //回显当前症状
    this.setData({
      ['curSymptom']: JSON.parse(options.symptom)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    // 请求症状列表
    api.symptoms(result => {
      if (result.code == 1000) {
        that.setData({
          ['symptoms']: result.data
        });
      }
    });
  },

  /**
   * 滑动切换Tab
   */
  swiperTab: function(event) {
    var that = this;
    var curIndex = event.detail.current;
    if (curIndex != that.data.curTab) {
      that.setData({
        ['curTab']: curIndex
      });
    }
  },

  /**
   * 点击切换Tab
   */
  clickTab: function(event) {
    var that = this;
    var dataBean = event.currentTarget.dataset;
    if (dataBean != null && dataBean.index != that.data.curTab) {
      if (dataBean.index == 0) {
        this.setData({
          ['curTab']: dataBean.index
        })
      } else {
        wx.showToast({
          title: '尚未开通，敬请期待',
          icon: 'none'
        })
      }
    }
  },

  /**
   * 单选症状
   */
  changeSymptom: function(event) {
    var that = this;
    var dataBean = event.currentTarget.dataset;
    if (dataBean != null) {
      var symptom = that.data.symptoms[dataBean.index];
      if (that.data.curSymptom.symptomNo != symptom.symptomNo) {
        this.setData({
          ['curSymptom']: {
            symptomNo: symptom.symptomNo,
            symptomName: symptom.symptomName
          }
        })
      }
    }
  },

  /**
   * 取消
   */
  cancel: function(event) {
    var that = this;
    var dataBean = event.currentTarget.dataset;
    if (dataBean != null) {
      wx.navigateBack({
        delta: 1
      });
    }
  },

  /**
   * 确定
   */
  commit: function(event) {
    var that = this;
    var dataBean = event.currentTarget.dataset;
    if (dataBean != null) {
      // 获取上级页面对象
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      wx.navigateBack({
        delta: 1
      });
      // 调用上级页面方法
      var curSymptom = that.data.curSymptom;
      if (prevPage.data.symptom.symptomNo != curSymptom.symptomNo) {
        prevPage.init(true, curSymptom)
      }
    }
  },
})