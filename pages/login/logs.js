// pages/login/logs.js
let bmap = require('../../libs/bmap-wx.min.js'),wxMarkerData = [];;
var http = require('../../config/api.js');
var token = require('../../config/request.js'),type='';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
    type = options.type;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    let that = this;
    let BMap = new bmap.BMapWX({
      ak: 'ePOzmUkkUHBq5qZvGx3WHlNuFXA7lI8o'
    });
    let fail = function (data) {
      // console.log(data)
    };
    let success = function (data) {
      // console.log(data)
      wxMarkerData = data.originalData.result;
      wx.setStorageSync("place", wxMarkerData.formatted_address)
    }
    BMap.regeocoding({
      fail: fail,
      success: success
    });
    // wx.getSetting({
    //   success: function (res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: function (res) {
    //           // console.log(res)
    //           // wx.switchTab({ 
    //           //   url: "/pages/index/index/index"
    //           // })
    //         }
    //       })
    //     }
    //   }
    // })
  },
  getoken:function(){    
    wx.login({
      success: res => {
        //console.log(res)
        let str = {
          code: res.code
        }        
        http.getCode(str,res=>{
          // console.log(res)
          let msg = '';          
          if (res.code==1000){
            msg = res.data; 
            token.header.token = res.data;
            wx.setStorageSync('token', msg); 
            if (type){
              wx.navigateBack({
                delta: 2
              });
            }else{
              wx.switchTab({
                url: "/pages/index/index/index"
              })
            }            
          } else if (res.code == 1010){
            msg = res.msg;
            token.header.token = msg;
            wx.setStorageSync('token', msg);             
            wx.getUserInfo({
              success: res => {
                // console.log(res)
                http.getToken({
                  token: msg,
                  rawData: res.rawData,
                  signature: res.signature,
                  encryptedData: res.encryptedData,
                  iv: res.iv
                }, res => {
                  // console.log(res)
                })
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
            wx.switchTab({
              url: "/pages/index/index/index"
            })
          } else{
            wx.showModal({
              title: '网络错误',
              content: '网络出错，请刷新重试',
              showCancel: false
            })
          }  
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }  
         
          
          
        })
      }
    })   
  },
  bindGetUserInfo: function(e) {
    // console.log(e.detail.userInfo)
    var that = this;
    if (e.detail.userInfo){ 
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 1000,
        mask:true,
        complete:function(){          
          that.getoken();
        }
      })     
     
    } else {      
      wx.showModal({
        title: '提示',
        content: '请授权获取更多的信息'
      })
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