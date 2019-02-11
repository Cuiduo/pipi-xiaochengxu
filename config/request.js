const rootDocment = 'https://tcal.pipifit.com/shelf/';
const header = {
  'Accept': 'application/json',
  'content-type': 'application/json',
  'token': null,
}


function getToken(url, data, cb) {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  wx.request({
    url: rootDocment + url,
    method: 'get',
    data: data,
    header: header,
    success: function(res) {
      wx.hideLoading();
      return typeof cb == "function" && cb(res.data)
    },
    fail: function(res) {
      console.log(res)
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof cb == "function" && cb(false)
    }
  })
}

function getReq(url, data, cb) {
  var token = wx.getStorageSync('token');
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  if (token == '') {
    wx.navigateTo({
      url: '/pages/login/logs?type=0',
    })
  } else {
    header.token = token;
  }
  wx.request({
    url: rootDocment + url,
    method: 'get',
    data: data,
    header: header,
    success: function(res) {
      wx.hideLoading();
      return typeof cb == "function" && cb(res.data)
    },
    fail: function(res) {
      console.log(res)
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof cb == "function" && cb(false)
    }
  })
}

function postReq(url, data, cb) {
  var token = wx.getStorageSync('token');
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  if (token) {
    header.token = token
  } else if (token == '') {
    console.log(token)
    wx.navigateTo({
      url: '/pages/login/logs?type=0',
    })
  }
  wx.request({
    url: rootDocment + url,
    header: header,
    data: data,
    method: 'post',
    success: function(res) {
      wx.hideLoading();
      return typeof cb == "function" && cb(res.data)
    },
    fail: function() {
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof cb == "function" && cb(false)
    }

  })


}
module.exports = {
  getReq: getReq,
  postReq: postReq,
  getToken: getToken,
  header: header,
}