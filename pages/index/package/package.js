// pages/index/package/package.js
var goodsList = []
var http = require('../../../config/api.js');
let endtime = '',id='',titiles='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDownDay: '00',
    countDownHour: '00',
    countDownMinute: '00',
    countDownSecond: '00',
    dataList: {},
    name:"",
    orno:false,
    countDownList: [],
    actEndTimeList: [],
    endTimeCost: [],
    lists: [],
    assaying:[],
    content1:'',
    content2:'',
    content3:'',
    isShow:false ,
    cutTime:'00',
    shareImg: false,
    mainImage:'',
    shopCartext:"加购物车",
    goods:[]
  },
  pushCar:function(){   
    http.pushCar({
      packageId: id.package_id,
      opt:"+",
      cateId:'-1'
    },res=>{      
      if (res.code==1000){
        wx.showToast({
          title: "成功",
          icon: 'success',
          mask: true
        })
      }      
    })
  },
  goHome: function () {
    wx.switchTab({
      url: '/pages/index/index/index'
    })
  },
  onLoad: function (options) {
    id = options;
  },  
  getData(){
    let that = this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
    });    
    if (id.type) {
      this.setData({
        shareImg: true,
        shopCartext:"买买买"
      })
    }   
    http.getPackages(id.package_id, res => {
      // console.log(res)
      endtime = res.data.countDown;
      this.setData({
        content1: res.data.content1,
        content2: res.data.content2,
        content3: res.data.content3,
        goods: res.data.goods,
        name: res.data.name,
        mainImage: res.data.mainImage,
        totalAmount: res.data.totalAmount,
        assaying: res.data.foods
      });
      titiles = res.data.name      
      // console.log(this.data.assaying)
      goodsList = [];
      goodsList.push(res.data) 
      this.cutDown();
      if (res.data.limitTimeFlag == 1) {
        this.setData({
          orno: true
        });
      }
      if (res.data.validFlag == 0) {
        if (res.data.limitTimeFlag ==0){
          this.setData({
            orno: false
          });
        }else{
          this.setData({
            isShow: true,
            orno: true
          })
        }
        
      } else {
        if (res.data.limitTimeFlag == 1) {
          this.setData({
            orno: true,
            totalAmount: res.data.totalAmount
          });
        }else{
          this.setData({
            orno: false,
            totalAmount: res.data.sourceAmount
          });
        }
      }
    })
    let endTimeList = [];   
    
    this.setData({
      dotLeft: "80%"
    }) 
  },
  timeFormat(param) {
    return param < 10 ? '0' + param : param;
  },
  cutDown() {
    let endTimeList = [];
    let currentTime = [];
    goodsList.forEach(o => { endTimeList.push(o.endTime), currentTime.push(o.currentTime) })
    this.setData({ actEndTimeList: endTimeList, endTimeCost: currentTime });    
    this.countDown();
  },
  timeFormat(param) {
    return param < 10 ? '0' + param : param;
  },
  countDown() {
    
    let newTime = new Date().getTime();
    let endTimeList = this.data.actEndTimeList;
    let currentTime = this.data.endTimeCost;
    let countDownArr = [];
    endTimeList.forEach(o => {
      let endTime = new Date(o.replace(/-/g, '/')).getTime();
      let obj = null;
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000;
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time / (60 * 60 * 24) *24);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = {
          day: this.timeFormat(day),
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else {
        obj = {
          day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }
        // this.getData();
      }
      countDownArr.push(obj);
      
    })
    for (let i = 0; i < goodsList.length; i++) {
      goodsList[i].obj = countDownArr[i]
    }
    this.setData({ countDownList: countDownArr })
    setTimeout(this.countDown, 1000);
    this.setData({
      lists: goodsList
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  showShareBox() {
    this.setData({
      shareBox: true
    });
  },
  hideShareBox() {
    this.setData({
      shareBox: false
    });
  },
  test(){
    this.hideShareBox()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onShareAppMessage: (res) => {
    
    
    if (res.from === 'button') {
      console.log(res.target);
    }
    else {
      // console.log("来自右上角转发菜单")
    }
    return {      
      title: titiles,
      path: '/pages/index/package/package?package_id=' + id.package_id+'&&type=0',      
      success: (res) => {
        
      },
      fail: (res) => {
        
      }
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
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

})