
const app = getApp();
var http = require('../../../config/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{
      // inviteCode: '821123123',
      // nickname: '张三李四王五赵六',
      // mobile: '13269285973',
      // totalAmount: '3722.00',
      // cashAmount: '10086.00',
      // avatar: ''
      // value1: '0',
      // value2: '00',
      // address: '这是个收货地址啊啊啊啊啊啊啊啊啊啊啊啊啊',
      // memberFlag: 1,
      // hasUpper : 1
    },
    inviter:
    {
      // upperUserNickname: "小编小茶",
      // upperUserAvatar: "http://static.pipifit.com/logo.png"
    },
    
    visibleinput :false,
    visiblesuccess : false,
    inputcode : '',
    hasUpper : 0

  },
  /**
   * 加载
   */
  onLoad(){
   
  },
  /**
   * show
   */
  onShow(){
    this.getUserInfo();
  },
  /**
   * 分享
   */
  onShareAppMessage:function()
  {

  },
  /**
   * 获取用户相关信息
   */
  getUserInfo(){
    var that = this;
    http.getCenterUserInfo(res=>{
      console.log(res)
       that.setData({
         data : res.data,
         hasUpper: res.data.hasUpper
       })
      that.changeSize();
    })
  },
  
  //复制功能
  copyinvicode(){
    // console.log('复制1')
    var that = this;
    //复制到剪贴板
    wx.setClipboardData({
      
      data: that.data.data.inviteCode,
      success(res) {
        // console.log('复制2')
        //读取剪贴板

      },
      fail(res)
      {
        console.log('复制失败')
      }
    })
  },

  //处理可提现余额样式
  changeSize:function()
  {
    var that = this;
    var length = that.data.data.cashAmount.length;
    var index = that.data.data.cashAmount.indexOf('.');

    that.setData({
      value1: that.data.data.cashAmount.substr(0,index-1)
    })
    that.setData({
      value2: that.data.data.cashAmount.substr(index+1)
    })
  },
  //*********页面跳转***********/
  //会员中心
    membertap() {
      wx.showModal({
        title: '提示',
        content: '暂未开通!',
      })
      // wx.navigateTo({
      //   url: "../member/index"
      // })
    },
    //手机号
    phonenumtap()
    {
      wx.showModal({
        title: '提示',
        content: '暂未开通!',
      })
      // wx.navigateTo({
      //   url: "../phone/index"
      // })
    },
    //订单列表
    ordertap()
    {
      wx.showModal({
        title: '提示',
        content: '暂未开通!',
      })
    },
    //收益
    earningstap()
    {
      wx.showModal({
        title: '提示',
        content: '暂未开通!',
      })
      // wx.navigateTo({
      //   url: "../myearning/index"
      // })
    },
    //粉丝
     fanstap(){
       wx.showModal({
         title: '提示',
         content: '暂未开通!',
       })
      //  wx.navigateTo({
      //    url: "../fans/index"
      //  })
     },
     
     //售后
      aftersales()
      {
        wx.showModal({
          title: '提示',
          content: '暂未开通!',
        })
        // wx.navigateTo({
        //   url: "../aftersaleserver/index"
        // })
      },
     //提现
     getcashtap()
     {
       wx.showModal({
         title: '提示',
         content: '暂未开通!',
       })
      //  wx.navigateTo({
      //    url: "../getcash/index"
      //  })
     },
    //  地址列表
      addresslisttap()
      {
        wx.showModal({
          title: '提示',
          content: '暂未开通!',
        })
      },
      //收藏列表
      collectiontap(){
        wx.showModal({
          title: '提示',
          content: '暂未开通!',
        })
      },
       //成为粉丝
      inputinvitatcodetap()
      {
        // wx.showModal({
        //   title: '提示',
        //   content: '暂未开通!',
        // })
        console.log('成为粉丝')
        this.setData({
          visibleinput :true
        })
      },
       //取消成为粉丝弹窗
      handleInputviewClose() {
        this.setData({
          visibleinput: false
        });
      },

       //确认要成为粉丝
      handleInputviewsure()
      {
        var that = this;
        if (that.data.inputcode.length == 0) {
          wx.showToast({
            title: '请输入邀请码',
            icon: 'none',
            duration: 2000
          })
        } else {
          // 
          that.postInputcode();
        }
      },
      // 网络校验邀请码
      postInputcode(){
         var that = this;
        http.bindInviteCode({'inviteCode': that.data.inputcode},res => {
          console.log(res)
          if(res.code ===1000)
          {
            that.setData({
              inviter: res.data
            })
            that.setData({
              visibleinput: false,
              visiblesuccess: true,
              hasUpper:1
            })

          }else
          {
            console.log(res.msg)
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration:2000
            })
          }
        
        } )

        
      },

      /**
       * 实时监听邀请码输入
       */
      bindinvitavalue(event) {
        // console.log(event.detail.value)
        var that = this;
        that.setData({
          inputcode: event.detail.value
        })
      },
      /**
       * 已经校验过验证码
       */
      hasVerifiCode()
      {
        var that =this;
        that.setData({
          visiblesuccess: false
          
          // data.hasUpper = 1
        })
      }

})