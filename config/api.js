const request = require('./request.js')
module.exports = {
  //获取code

  getCode: (data, callback) => request.getToken('wx/login', data, callback),
  // 获取token
  getToken: (data, callback) => request.postReq('wx/userInfo', data, callback),
  //个人中心获取个人信息
  getCenterUserInfo: (callback) => request.getReq('user/center', '', callback),
  //获取首页列表
  getIndex: (callback) => request.getReq('packages', '', callback),
  //获取套餐包详情
  getPackages: (id, callback) => request.getReq('packages/' + id, '', callback),
  //加入购物车 
  pushCar: (data, callback) => request.postReq('shopcart', data, callback),
  //绑定用户邀请码
  bindInviteCode: (data, callback) => request.postReq('promoter', data, callback),

  /*-----------------------------------wxy-----------------------------------*/
  //获取食材表（加载更多）
  foodTable: (params, callback) => request.getReq('foodTable', params, callback),
  //单击食材获取商品（排序）
  goodsList: (params, callback) => request.getReq('goods/list', params, callback),
  //长按食材不喜欢
  foodDislike: (params, callback) => request.postReq('foodTable/notLike', params, callback),
  //长按食材置顶
  foodUpTop: (params, callback) => request.postReq('foodTable/upTop', params, callback),
  //购物车商品添加、商品数量加减
  cartModified: (params, callback) => request.postReq('shopcart', params, callback),
  //症状列表
  symptoms: (callback) => request.getReq('symptoms', '', callback),
  /*-----------------------------------wxy-----------------------------------*/

}