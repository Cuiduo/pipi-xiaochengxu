// pages/phone/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     phonenum:'',//手机号
     verificode:'',
     sendtitle :'发送验证码',
     sendcodebtdisabled:false
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
  /**
   * 实时监听手机号输入
   */
  bindphonevalue(event){
   this.setData({
     phonenum:event.detail.value
   })
  },
  /**
   * 实时监听验证码输入
   */
  bindvericodevalue(event){
    this.setData({
      verificode: event.detail.value
    })
  },

  /**
   * 发送验证码
   */
  sendcodetap(){
   
    var that = this;
    if (that.data.phonenum.length == 0) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
    }else
    {
      wx.showToast({
        title: '验证码发送成功！',
        icon: 'none',
        duration: 2000,
      });

      this.sendcodesuccess();
    }
  
   
  },
  //处理验证码发送成功后发送按钮逻辑
  sendcodesuccess(){
    
    var that = this;
    that.setData({
      sendcodebtdisabled: true 
    })
    var coden = 60 //定义60秒
    var codeV = setInterval(function () {

      var str = '重新获取' + (coden--) + 's';
      // console.log(str)
      that.setData({
        sendtitle: str
      })
      if (coden == -1) {
        clearInterval(codeV)
        that.setData({
          sendtitle: '发送验证码',
          sendcodebtdisabled :false
        })
      } else {

      }
    }, 1000)
  },

   bindPhonenum()
   {
     var that = this;
     if(that.data.phonenum.length==0)
     {
       wx.showToast({
         title: '请输入手机号',
         icon: 'none',
         duration :2000
       })
     } else if (that.data.verificode.length==0)
     {
       wx.showToast({
         title: '请输入验证码',
         icon: 'none',
         duration: 2000
       })
     }else
     {
       wx.showToast({
         title: '手机号绑定成功',
         icon: 'success',
         duration: 2000
       })
       //两秒延迟跳转
       setTimeout(function(){
         wx.navigateBack({

         })
       },2000)
  
     }
   }

})