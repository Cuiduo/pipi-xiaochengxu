
var http = require('../../../config/api.js');
Page({
  data: {
    // text:"这是一个页面"
    actionSheetHidden: true,
    x: 340,
    y: 350,
    shareBox:false,
    actionSheetItems: [
      { bindtap: 'Menu1', txt: '菜单1' },
      { bindtap: 'Menu2', txt: '菜单2' },
      { bindtap: 'Menu3', txt: '菜单3' },      
    ],
    menu: '',
    collectimg:'../../../images/collectimg.png',
    collect: false,
    shareImg: false
  }, 
  onLoad: function (options){
    // console.log(options); 
    if (options.type){
      this.setData({
        shareImg:true
      })
    }
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000,      
    });      
  }, 
  pushComment:function(){
    wx.showToast({
      title: '正在开发中,敬请期待',
      icon: 'none'
    })
    
  },
  goHome:function(){
    wx.switchTab({
      url: '/pages/index/index/index'
    })
  },
  actionSheetTap: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  collect: function() { 
    let that = this;    
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000, 
      success: function () {
        if (that.data.collect) {          
          that.data.collect = !that.data.collect;
          that.setData({
            collectimg: "../../../images/collectimg.png"
          })
          setTimeout(() => {
            wx.showToast({
              title: '取消成功',
              icon: 'success'
            })},1000)
          
        } else {
          that.data.collect = !that.data.collect;
          that.setData({
            collectimg: "../../../images/collected.png"
          })
          setTimeout(() => {
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 1000
            })}, 1000)
        }        
        
      }
    })  
    
  },
  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu1: function () {
    this.setData({
      menu: 1,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu2: function () {
    this.setData({
      menu: 2,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu3: function () {
    this.setData({
      menu: 3,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  onShareAppMessage: (res) => {
    if (res.from === 'button') {
    }
    else {
    }
    return {
      // title: '妹子图片',
      path: '/pages/index/article/article?id=123456&type=0',
      // imageUrl: "/images/1.jpg",
      success: (res) => {
      },
      fail: (res) => {
      }
    }
  },
  showShareBox() {
    this.setData({
      shareBox: true
    });
  },
  hideShareBox() {
    this.setData({
      shareBox: false
    });
  }

})

