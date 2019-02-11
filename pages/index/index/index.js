let wxMarkerData = [];
var goodsList = [{
  actEndTime: '2019-05-01 10:00:43'
}, ]
var http = require('../../../config/api.js'),
  package_id = '';
Page({
  data: {
    markers: [1, 2],
    showView: true,
    windowHeight: 654,
    maxtime: "",
    isHiddenLoading: true,
    isHiddenToast: true,
    place:"北京",
    dataList: {},
    countDownList: [],
    actEndTimeList: [],
    endTimeCost: [],
    lists: [],
    countDownDay: '00',
    countDownHour: '00',
    countDownMinute: '00',
    countDownSecond: '00',
    showTitle: "",
    overTime: false
  },
  collect: function() {
    let that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000,
      mask: true,
      success: function() {
        if (that.data.collect) {
          that.data.collect = !that.data.collect;
          that.setData({
            collectimg: "../../../images/collectimg.png"
          })
          setTimeout(() => {
            wx.showToast({
              title: '取消成功',
              icon: 'success'
            })
          }, 1000)
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
            })
          }, 1000)
        }
      }
    })
  },
  goArticle() {
    wx.navigateTo({
      url: '/pages/index/article/article?article_id=111'
    })
  },
  goBag(e) {
    let id = e.currentTarget.dataset.item;
    // let endTime = new Date(o.replace(/-/g, '/')).getTime();
    let times = (new Date(id.endTime.replace(/-/g, '/')).getTime()) - (new Date(id.currentTime.replace(/-/g, '/')).getTime())
    if (times < 0) {
      if (id.limitTimeFlag == 1) {
        wx.showToast({
          title: '活动已结束',
          icon: 'none'
        })
      } else {
        wx.navigateTo({
          url: '/pages/index/package/package?package_id=' + id.packageId
        })
      }
    } else {
      wx.navigateTo({
        url: '/pages/index/package/package?package_id=' + id.packageId
      })
    }

  },
  onReady: function() {
    var totalSecond = 1548640080 - Date.parse(new Date()) / 1000;
    var interval = setInterval(function() {
      var second = totalSecond;
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;
      this.setData({
        countDownDay: dayStr,
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        this.setData({
          countDownDay: '00',
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
        });
      }
    }.bind(this), 1000);
  },
  onLoad: function() {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    if (wx.getStorageSync("place")){
      this.setData({
        place: wx.getStorageSync("place")
      })
    }
  },
  getData() {
    http.getIndex(res => {
      let that = this;
      // console.log(res);
      goodsList = res.data
      that.cutDown();
    })
  },
  cutDown() {
    let endTimeList = [];
    let currentTime = [];
    goodsList.forEach(o => {
      endTimeList.push(o.endTime), currentTime.push(o.currentTime)
    })
    this.setData({
      actEndTimeList: endTimeList,
      endTimeCost: currentTime
    });
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
        let hou = parseInt(time / (60 * 60 * 24)*24);
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

      }
      countDownArr.push(obj);
    })
    for (let i = 0; i < goodsList.length; i++) {
      goodsList[i].obj = countDownArr[i]
    }
    this.setData({
      countDownList: countDownArr
    })
    setTimeout(this.countDown, 1000);
    this.setData({
      lists: goodsList
    })
  },
  _onCancel() {
    this.setData({
      showView: true
    })
  },

  _onShow(e) {
    let id = e.currentTarget.dataset.item;
    package_id = id
    // let endTime = new Date(o.replace(/-/g, '/')).getTime();
    let times = (new Date(id.endTime.replace(/-/g, '/')).getTime()) - (new Date(id.currentTime.replace(/-/g, '/')).getTime())
    if (times < 0) {
      if (id.limitTimeFlag == 1) {
        wx.showToast({
          title: '活动已结束',
          icon: 'none'
        })
      } else {
        this.setData({
          showView: false,
          showTitle: id.packageName
        })
      }
    } else {
      this.setData({
        showView: false,
        showTitle: id.packageName
      })
    }
  },
  goShare() {
    this._onCancel()
  },
  onShareAppMessage: (res) => {
    if (res.from === 'button') {
      return {
        title: package_id.packageName,
        imageUrl: package_id.packageMainImg,
        path: '/pages/index/package/package?package_id=' + package_id.packageId + '&&type=0',
        success: (res) => {
          
        },
        fail: (res) => {
          
        }
      }
    } else {
      return {
        path: '/pages/index/index/index?id=123456&&type=0',
        success: (res) => {
          
        },
        fail: (res) => {
          
        }
      }
    }

  },
  onShow: function() {
    this.getData();
  },
})