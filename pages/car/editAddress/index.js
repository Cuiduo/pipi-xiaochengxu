const fetch = require("../../../config/ajax.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info:{
      name: '',
      mobile: '',
      detailAddress: '',
      tag: null
    },
    dest: [{ name: '--请选择--', code: '' }, { name: '北京市', code: '10000' }, { name: '南京市', code: '12000' }],
    destIndex: 0,

    label: [{ name: '家', value: 1 }, { name: '公司', value: 2 }, { name: '学校', value: 3 }, { name: '其他', value: 0 }],

    isAddDest: true   //true-新增 false-修改
  },
  // 所在地区
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      destIndex: e.detail.value
    })
  },
  // 标签选择
  tabLabel: function (e){
    this.setData({
      'info.tag': e.currentTarget.dataset.index
    })
  },
  //删除地址
  deleteDest: function (){
    let id = this.data.info.id;
    wx.showModal({
      content: '确定要删除该地址吗？',
      cancelColor: '#333333',
      confirmText: '删除',
      confirmColor: '#F1531F',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          fetch.ajax({ url: `${fetch.constant.address}/${id}`, method: 'DELETE' }).then((res) => {
            wx.showToast({
              title: res,
              icon: 'none'
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 表单提交
  formSubmit(e) {
    let value = Object.assign(e.detail.value, { tag: this.data.info.tag});
    console.log('form发生了submit事件，携带数据为：', value)
    // 请填写收货人
    if (!value.name) {
      wx.showToast({ title: '请填写收货人', icon: 'none' })
      return;
    }
    //请填写联系电话
    if (!value.mobile) {
      wx.showToast({ title: '请填写联系电话', icon: 'none' })
      return;
    }
    if (value.mobile.length != 11) {
      wx.showToast({ title: '请填写11位联系电话', icon: 'none' })
      return;
    }
    //请选择所在地区
    if (!value.provinceCode || value.provinceCode == 0) {
      wx.showToast({ title: '请选择所在地区', icon: 'none' })
      return;
    }
    //请选择市
    if (!value.cityCode || value.cityCode == 0) {
      wx.showToast({ title: '请选择市', icon: 'none' })
      return;
    }
    //请选择所在区/县
    if (!value.districeCode || value.districeCode == 0) {
      wx.showToast({ title: '请选择所在区/县', icon: 'none' })
      return;
    }
    //请选择乡镇/街道
    if (!value.streetCode || value.streetCode == 0) {
      wx.showToast({ title: '请选择乡镇/街道', icon: 'none' })
      return;
    }
    //请填写详细地址
    if (!value.detailAddress || value.detailAddress == 0) {
      wx.showToast({ title: '请填写详细地址', icon: 'none' })
      return;
    }
    //请选择标签
    if (value.tag == null) {
      wx.showToast({ title: '请选择标签', icon: 'none' })
      return;
    }

    if (this.data.isAddDest){  //新增
      fetch.ajax({ url: fetch.constant.address, method: 'POST', data: value}).then((res) => {
        wx.showToast({
          title: res,
          icon: 'none'
        })
      })
    }else{   //修改
      value = Object.assign(value, {id: this.data.info.id});
      fetch.ajax({ url: fetch.constant.address, method: 'PUT', data: value }).then((res) => {
        wx.showToast({
          title: res,
          icon: 'none'
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断地址类型 newDest-新增
    let id = options.id || 5;
    if (id != 'newDest'){
      wx.setNavigationBarTitle({
        title: '编辑收货地址'
      });
      this.setData({
        isAddDest: false
      })
      fetch.ajax({ url: `${fetch.constant.address}/${id}`, method: 'GET'}).then((res) => {
        this.setData({
          info: res
        })
      })
    }else{
      wx.setNavigationBarTitle({
        title: '新建收货地址'
      });
    }
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
    wx.showModal({
      content: '信息还未保存，确认返回吗？',
      cancelColor: '#333333',
      confirmColor: '#F1531F',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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