const indexData = require('../data/data-index.js');
const api = require('../../../config/api.js');

//顶部导航栏高度
var navBarHeight = 0;
//食材类别吸顶栏高度
var tabStickyHeight = 0;
//可用屏幕高度
var clientHeight = 0;
//已滚动的高度
var scrollHeight = 0;
//每次加载几个数据
var loadMoreNum = 2;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //导航栏悬停顶部设置
    isNavFloating: true,
    //食材类别栏吸顶效果设置
    isTabSticky: true,
    //当前症状
    symptom: {
      symptomNo: 1,
      symptomName: '减脂'
    },
    //商品列表置顶
    goodsScrollTop: 0,
    //地址
    addressData: {
      id: 0,
      name: '选择地址'
    },
    //商品列表当前展示优先级
    prority: {
      id: 1,
      name: '价格优先'
    },
    //底部商品列表弹窗设置
    bottomSheet: {
      show: false,
      foodId: 0
    },
    //长按食材弹窗设置
    foodPop: {
      show: false,
      indexs: [],
      ids: [],
      offsetLeft: 0,
      offsetTop: 0,
      foodPopStyle: '',
      moreHalfWindowHeight: false
    },
    //食材
    foodsData: [],
    //商品
    goodsData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取系统信息
    wx.getSystemInfo({
      success: function(res) {
        // 获取可使用窗口高度
        clientHeight = res.windowHeight;
      }
    })
    //获取地址
    wx.getStorage({
      key: 'place',
      success: res => {
        console.log(res)
        this.setData({
          ['addressData']: {
            name: res.data
          }
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;

    // 获取导航区域高度
    if (that.data.isNavFloating) {
      var query = wx.createSelectorQuery();
      query.select('#id_navBar').boundingClientRect()
      query.exec(function(res) {
        if (res != null) {
          navBarHeight = res[0].height;
        }
      })
    }
    // 获取吸顶tab高度
    if (that.data.isTabSticky) {
      var query = wx.createSelectorQuery();
      query.select('#id_tabSticky').boundingClientRect()
      query.exec(function(res) {
        if (res != null) {
          tabStickyHeight = res[0].height;
        }
      })
    }

    //初始化页面
   that.init(false, that.data.symptom);

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 分享
   */
  onShareAppMessage: function() {
    return {
      title: '打开全球首发智能减脂食材表',
      path: '/pages/optimization/index/index',
      imageUrl: 'http://static.pipifit.com/Fnra3PxmjICEeK9eKgTx39sjneoy',
    }
  },

  /**
   * 屏幕滚动
   */
  onPageScroll: function(event) {
    scrollHeight = event.scrollTop;
  },

  /**
   * 防止穿透
   */
  noop: function noop() {},

  /**
   * 初始化页面数据
   */
  init(isScorllTop, symptom) {
    var that = this;

    var parems = {
      symptomNo: symptom.symptomNo
    };

    api.foodTable(parems, result => {
      if (result.code == 1000) {
        //更新食材表
        that.setData({
          ['symptom']: symptom,
          ['foodsData']: result.data
        });
        // 置顶
        if (isScorllTop) {
          wx.pageScrollTo({
            duration: 0,
            scrollTop: 0
          })
        }
      }
    });

  },

  /**
   * 定位到索引位置
   */
  scrollToIndex: function(event) {
    var dataBean = event.currentTarget.dataset;
    if (dataBean != null) {
      const query = wx.createSelectorQuery()
      query.select('#id_' + dataBean.level).boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function(res) {
        if (res != null) {
          wx.pageScrollTo({
            duration: 0,
            scrollTop: res[0].top + res[1].scrollTop - navBarHeight - tabStickyHeight
          })
        }
      })
    }
  },

  /**
   * 选择地址
   */
  chooseAddress: function(event) {
    console.log('点击了选择地址')
    wx.showToast({
      title: '点击了选择地址',
      icon: 'none'
    })
  },

  /**
   * 货架
   */
  shelf: function(event) {
    console.log('点击了货架')
    wx.showToast({
      title: '点击了货架',
      icon: 'none'
    })
  },

  /**
   * 筛选
   */
  filter: function(event) {
    wx.navigateTo({
      url: '../filter/filter?symptom=' + JSON.stringify(this.data.symptom)

    })
  },

  /**
   * 加载更多
   */
  loadMore: function(event) {
    var that = this;
    var dataBean = event.currentTarget.dataset;
    if (dataBean != null) {
      var curIndex = dataBean.index;
      var levelBean = that.data.foodsData[curIndex];
      var foodCategoryList = levelBean.foodCategoryList;
      if (levelBean.loadMore == 1) {
        // 传参
        var parems = {
          symptomNo: that.data.symptom.symptomNo,
          level: levelBean.level,
          nowShowItemNum: foodCategoryList[0].foodList.length,
          needItemNum: loadMoreNum,
        };
        // 请求
        api.foodTable(parems, result => {
          if (result.code == 1000) {
            //将新获取到的数据追加到旧数据上
            var moreData = result.data[0];
            var moreCategoryList = moreData.foodCategoryList;
            var moreCategoryLength = moreCategoryList.length;
            for (var i = 0; i < moreCategoryLength; i++) {
              moreCategoryList[i].foodList = foodCategoryList[i].foodList.concat(moreCategoryList[i].foodList);
            }
            //更新食材表
            that.setData({
              ['foodsData[' + curIndex + ']']: moreData
            });
          }
        });
      }
    }
  },

  /**
   * 单击食材
   */
  clickFood: function(event) {
    var that = this;
    var dataBean = event.currentTarget.dataset;
    if (dataBean != null) {
      var foodId = dataBean.ids[2];
      that.getGoodsList(true, foodId, that.data.prority)
    }
  },

  /**
   *  获取商品列表(重新排序)
   */
  getGoodsList(isShowSheet, foodId, prority) {
    var that = this;
    if (foodId != 0) {
      // 传参
      var parems = {
        foodId: foodId,
        sortBy: prority.id,
      };
      // 请求
      api.goodsList(parems, result => {
        if (result.code == 1000) {
          var goods = result.data;
          if (goods.length > 0) {
            //弹窗
            if (isShowSheet) {
              that.showBottomSheet(foodId);
            }
            //商品列表
            that.setData({
              ['prority']: prority,
              ['goodsData']: goods,
              ['goodsScrollTop']: 0
            });
          } else {
            wx.showToast({
              title: '暂无商品',
              icon: 'none'
            })
          }
        }
      });
    }
  },

  /**
   * 长按食材
   */
  longPressFood: function(event) {

    var that = this;
    var currentTarget = event.currentTarget;
    var dataBean = currentTarget.dataset;
    if (dataBean != null) {

      var ids = dataBean.ids;

      if (ids[2] != 0 && !that.data.foodPop.show) {
        //当前view位置是否超过了屏幕的一半
        var moreHalfWindowHeight = false;
        if (currentTarget.offsetTop - scrollHeight > clientHeight / 2) {
          moreHalfWindowHeight = true;
        }
        //设置食材弹窗样式
        var foodPopStyle;
        var indexs = dataBean.indexs;
        switch (indexs[1]) {
          case 0:
            if (moreHalfWindowHeight) {
              foodPopStyle = 'foodPop-tl';
            } else {
              foodPopStyle = 'foodPop-bl';
            }
            break;
          case 4:
            if (moreHalfWindowHeight) {
              foodPopStyle = 'foodPop-tr';
            } else {
              foodPopStyle = 'foodPop-br';
            }
            break;
          default:
            if (moreHalfWindowHeight) {
              foodPopStyle = 'foodPop-tm';
            } else {
              foodPopStyle = 'foodPop-bm';
            }
            break;
        }

        // 显示长按食材弹窗
        that.setData({
          ['foodPop']: {
            show: true,
            indexs: indexs,
            ids: ids,
            offsetLeft: currentTarget.offsetLeft,
            offsetTop: currentTarget.offsetTop,
            foodPopStyle: foodPopStyle,
            moreHalfWindowHeight: moreHalfWindowHeight
          }
        });
      }
    }
  },

  /**
   * 隐藏长按食材弹窗
   */
  hideFoodPop() {
    var that = this;
    if (that.data.foodPop.show) {
      this.setData({
        ['foodPop']: {
          show: false,
          indexs: [],
          ids: [],
          offsetLeft: 0,
          offsetTop: 0,
          foodPopStyle: '',
          moreHalfWindowHeight: false
        }
      });
    }
  },


  /**
   * 置顶食材
   */
  topFood: function(event) {
    var that = this;
    var foodPop = that.data.foodPop;
    var ids = foodPop.ids;
    var indexs = foodPop.indexs;
    var levelBean = that.data.foodsData[indexs[0]];
    var categoryBean = levelBean.foodCategoryList[indexs[1]];
    var foodList = categoryBean.foodList;
    that.hideFoodPop();
    // 传参
    var parems = {
      symptomNo: that.data.symptom.symptomNo,
      level: ids[0],
      categoryId: ids[1],
      foodId: ids[2],
    };
    // 请求
    api.foodUpTop(parems, result => {
      if (result.code == 1000) {
        //置顶数据
        foodList.unshift(foodList.splice(indexs[2], 1)[0]);
        //更新食材表
        that.setData({
          ['foodsData[' + indexs[0] + '].foodCategoryList[' + indexs[1] + '].foodList']: foodList
        });
        wx.showToast({
          title: '置顶成功',
          icon: 'none'
        })
      }
    });
  },

  /**
   * 不喜欢食材
   */
  dislikeFood: function(event) {
    var that = this;
    var foodPop = that.data.foodPop;
    var ids = foodPop.ids;
    var indexs = foodPop.indexs;
    var levelBean = that.data.foodsData[indexs[0]];
    var categoryBean = levelBean.foodCategoryList[indexs[1]];
    var foodList = categoryBean.foodList;
    that.hideFoodPop();
    // 传参
    var parems = {
      symptomNo: that.data.symptom.symptomNo,
      level: ids[0],
      categoryId: ids[1],
      foodId: ids[2],
      nowShowItemNum: foodList.length,
    };
    // 请求
    api.foodDislike(parems, result => {
      if (result.code == 1000) {
        //删除并补充数据
        foodList.splice(indexs[2], 1);
        foodList.push(result.data);
        console.log(event)
        console.log(indexs[2])
        console.log(result.data)
        //更新食材表
        that.setData({
          ['foodsData[' + indexs[0] + '].foodCategoryList[' + indexs[1] + '].foodList']: foodList
        });
        wx.showToast({
          title: '已移至不喜欢',
          icon: 'none'
        })
      }
    });
  },

  /**
   * 显示底部弹窗
   */
  showBottomSheet(foodId) {
    this.setData({
      ['bottomSheet']: {
        show: true,
        foodId: foodId
      }
    });
  },

  /**
   * 隐藏底部弹窗
   */
  hideBottomSheet() {
    this.setData({
      ['bottomSheet']: {
        show: false,
        foodId: 0
      }
    });
  },

  /**
   * 切换底部弹窗优先级
   */
  switchPrority: function(event) {
    var that = this;
    var dataBean = event.currentTarget.dataset;
    if (dataBean != null) {
      var newPrority = dataBean.prority;
      if (newPrority.id != that.data.prority.id) {
        that.getGoodsList(false, that.data.bottomSheet.foodId, newPrority)
      }
    }
  },

  // 加入购物车
  addCart: function(event) {
    var that = this;
    var dataBean = event.currentTarget.dataset;
    if (dataBean != null) {
      // 传参
      console.log(dataBean)
      var parems = {
        goodId: dataBean.id_goods,
        cateId: that.data.symptom.symptomNo,
        opt: '+',
      };
      // 请求
      api.cartModified(parems, result => {
        if (result.code == 1000) {
          wx.showToast({
            title: '添加成功'
          })
        }
      });
    }
  },

})