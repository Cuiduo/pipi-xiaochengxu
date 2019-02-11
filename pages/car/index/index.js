// pages/car/index/index.js
const fetch = require("../../../config/ajax.js");
const { watch, computed } = require('../../../utils/vuefy.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cates: [],
    totalAmount: 0,
    tipsLen: 50,
    isFirst: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.isFirst){
      this.getData();
    } 

    //计算属性
    computed(this, {
      //商品总价
      foodAllPrice: function () {
        let price = 0, data = this.data.cates;
        data.forEach(item => {
          if (item.isSelect) {
            price += Number(item.cateTotalAmount);
          }
        })
        return price.toFixed(2).split('.');
      },
    })
  },
  //获取购物车数据
  getData: function () {
    let len = this.data.tipsLen;
    fetch.ajax({ url: fetch.constant.shopcart }).then((res) => {
      const { cates, totalAmount } = res;
      cates.forEach(item => {
        item.isSelect = true;
        item.items.forEach(val => {
          if (val.tips && val.tips.length > len) {
            val.tipsShort = val.tips.substr(0, len) + '...';
            val.isShort = true
          } else {
            val.tipsShort = val.tips;
            val.isShort = false
          }
        })
      })
      this.setData({ cates, totalAmount, isFirst: false })
    })
  },
  

  //数量点击变化
  numberChange: function (e) {
    let [value, cates] = [e.currentTarget.dataset, this.data.cates];
    let firstArr = cates[value.index], secondArr = cates[value.index].items[value.secondindex], _that = this;
    let params = { 
      cateId: firstArr.cateId, 
      goodId: secondArr.goodId, 
      packageId: secondArr.packageId, 
      opt: value.opt
    };
    if (value.opt == '-'){  //减数量
      if (parseInt(secondArr.num) <= 1){  //提示删除
        wx.showModal({
          title: '',
          content: '确定要删除该商品吗？',
          cancelColor: '#333333',
          confirmText: '删除',
          confirmColor: '#F1531F',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              _that.numberAjax(params, function () {
                cates[value.index].items.splice(value.secondindex, 1);
                _that.setData({ cates });
                _that.priceChange(value.index);
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return false
      }else{   
        _that.numberAjax(params, function () {
          cates[value.index].items[value.secondindex].num--;
          _that.setData({
            cates
          })
          _that.priceChange(value.index)
        })
      }
    } else {  //加数量
      _that.numberAjax(params, function () {
        cates[value.index].items[value.secondindex].num++;
        _that.setData({
          cates
        })
        _that.priceChange(value.index)
      })
    }
  },
  //购物车商品添加、商品数量加减
  numberAjax: function (data, fn) {
    fetch.ajax({ url: fetch.constant.shopcart, method: 'POST', data: data }).then((res) => {
      if(fn && typeof fn == 'function') fn()
    })
  },
  // 价格变化
  priceChange: function (firstIndex) {
    let cates = JSON.parse(JSON.stringify(this.data.cates));
    if (cates[firstIndex].items.length == 0){
      cates.splice(firstIndex, 1)
    }else{
      cates[firstIndex].cateTotalAmount = cates[firstIndex].items.reduce((num, val, index, arr) => {
        return num + (Number(val.amount) * Number(val.num))
      }, 0).toFixed(2);
    }
    this.setData({ cates })
  },
  //商品选择与否
  toggleSelect: function (e) {
    let [cates, index] = [JSON.parse(JSON.stringify(this.data.cates)), e.currentTarget.dataset.index];
    cates[index].isSelect = !cates[index].isSelect;
    this.setData({ cates })
  },
  //tips展开
  tipsShow: function (e) {
    let [dataset, cates] = [e.currentTarget.dataset, JSON.parse(JSON.stringify(this.data.cates))];
    this.setData({
      ['cates[' + dataset.index + '].items[' + dataset.secondindex + '].isShort']: !cates[dataset.index].items[dataset.secondindex].isShort
    })
  },
  //点击结算，粉丝
  topay: function () {
    wx.showModal({
      title: '提示',
      content: '暂未开通!',
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
    if(!this.data.isFirst){
      this.getData();
    }
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