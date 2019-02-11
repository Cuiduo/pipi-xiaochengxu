// pages/aftersale/index.js
let list=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentindex : 0,
    windowHeight: '',
    applyAftersaleList:[
       {
        creattime:'2018-01-31 14:50:46',
        images: ['https://goss3.veer.com/creative/vcg/veer/612/veer-127431354.jpg', 'https://goss.veer.com/creative/vcg/veer/612/veer-303783569.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-303312876.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-132358455.jpg', 'https://goss3.veer.com/creative/vcg/veer/612/veer-150011067.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-133728465.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-303312876.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-132358455.jpg', 'https://goss3.veer.com/creative/vcg/veer/612/veer-150011067.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-133728465.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-303312876.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-132358455.jpg', 'https://goss3.veer.com/creative/vcg/veer/612/veer-150011067.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-133728465.jpg','https://goss1.veer.com/creative/vcg/veer/612/veer-300909100.jpg'],
        realypay : '188.66',
       },
      {
        creattime: '2018-01-31 14:50:46',
        images: ['https://goss3.veer.com/creative/vcg/veer/612/veer-127431354.jpg', 'https://goss.veer.com/creative/vcg/veer/612/veer-303783569.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-303312876.jpg',
'https://goss1.veer.com/creative/vcg/veer/612/veer-303312876.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-132358455.jpg', 'https://goss3.veer.com/creative/vcg/veer/612/veer-150011067.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-133728465.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-132358455.jpg', 'https://goss3.veer.com/creative/vcg/veer/612/veer-150011067.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-133728465.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-300909100.jpg'],
        realypay: '188.66',
      },
      {
        creattime: '2018-01-31 14:50:46',
        images: ['https://goss3.veer.com/creative/vcg/veer/612/veer-127431354.jpg', 'https://goss.veer.com/creative/vcg/veer/612/veer-303783569.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-303312876.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-132358455.jpg', 'https://goss3.veer.com/creative/vcg/veer/612/veer-150011067.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-303312876.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-132358455.jpg', 'https://goss3.veer.com/creative/vcg/veer/612/veer-150011067.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-133728465.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-133728465.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-300909100.jpg'],
        realypay: '188.66',
      },
      {
        creattime: '2018-01-31 14:50:46',
        images: ['https://goss3.veer.com/creative/vcg/veer/612/veer-127431354.jpg', 'https://goss.veer.com/creative/vcg/veer/612/veer-303783569.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-303312876.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-132358455.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-303312876.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-132358455.jpg', 'https://goss3.veer.com/creative/vcg/veer/612/veer-150011067.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-133728465.jpg', 'https://goss3.veer.com/creative/vcg/veer/612/veer-150011067.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-133728465.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-300909100.jpg'],
        realypay: '188.66',
      },
      {
        creattime: '2018-01-31 14:50:46',
        images: ['https://goss3.veer.com/creative/vcg/veer/612/veer-127431354.jpg', 'https://goss.veer.com/creative/vcg/veer/612/veer-303783569.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-303312876.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-132358455.jpg', 'https://goss3.veer.com/creative/vcg/veer/612/veer-150011067.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-133728465.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-300909100.jpg'],
        realypay: '188.66',
      },
      {
        creattime: '2018-01-31 14:50:46',
        images: ['https://goss3.veer.com/creative/vcg/veer/612/veer-127431354.jpg', 'https://goss.veer.com/creative/vcg/veer/612/veer-303783569.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-303312876.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-132358455.jpg', 'https://goss3.veer.com/creative/vcg/veer/612/veer-150011067.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-133728465.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-300909100.jpg'],
        realypay: '188.66',
      },
      {
        creattime: '2018-01-31 14:50:46',
        images: ['https://goss3.veer.com/creative/vcg/veer/612/veer-127431354.jpg', 'https://goss.veer.com/creative/vcg/veer/612/veer-303783569.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-303312876.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-303312876.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-132358455.jpg', 'https://goss3.veer.com/creative/vcg/veer/612/veer-150011067.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-133728465.jpg', 'https://goss2.veer.com/creative/vcg/veer/612/veer-132358455.jpg', 'https://goss3.veer.com/creative/vcg/veer/612/veer-150011067.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-133728465.jpg', 'https://goss1.veer.com/creative/vcg/veer/612/veer-300909100.jpg'],
        realypay: '188.66',
      }
    ],
    afterSalelistList:[
    {
      creattime: '2018-01-31 14:50:46',
      images: 'https://goss1.veer.com/creative/vcg/veer/612/veer-300909100.jpg',
      nums: '2',
      title:'绿鲜知 荷兰豆 约500g 新鲜蔬菜',
      status :'已售后'
      },
      {
        creattime: '2018-01-31 14:50:46',
        images: 'https://goss1.veer.com/creative/vcg/veer/612/veer-300909100.jpg',
        nums: '2',
        title: '绿鲜知 荷兰豆 约500g 新鲜蔬菜',
        status: '已售后'
      },
      {
        creattime: '2018-01-31 14:50:46',
        images: 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg',
        nums: '2',
        title: '绿鲜知 荷兰豆 约500g 新鲜蔬菜绿鲜知 荷兰豆 约500g 新鲜蔬菜绿鲜知 荷兰豆 约500g 新鲜蔬菜',
        status: '已售后'
      },
      {
        creattime: '2018-01-31 14:50:46',
        images: 'https://goss1.veer.com/creative/vcg/veer/612/veer-300909100.jpg',
        nums: '2',
        title: '绿鲜知 荷兰豆 约500g 新鲜蔬菜 绿鲜知 荷兰豆 约500g 新鲜蔬菜',
        status: '已售后'
      },
      {
        creattime: '2018-01-31 14:50:46',
        images: 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg',
        nums: '2',
        title: '绿鲜知 荷兰豆 约500g 新鲜蔬菜  新鲜蔬菜新鲜蔬菜',
        status: '已售后'
      },
      {
        creattime: '2018-01-31 14:50:46',
        images: 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg',
        nums: '2',
        title: '绿鲜知 荷兰豆 约500g 新鲜蔬菜  新鲜蔬菜新鲜蔬菜',
        status: '已售后'
      },
      {
        creattime: '2018-01-31 14:50:46',
        images: 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg',
        nums: '2',
        title: '绿鲜知 荷兰豆 约500g 新鲜蔬菜  新鲜蔬菜新鲜蔬菜',
        status: '已售后'
      },
      {
        creattime: '2018-01-31 14:50:46',
        images: 'https://goss2.veer.com/creative/vcg/veer/612/veer-143277328.jpg',
        nums: '2',
        title: '绿鲜知 荷兰豆 约500g 新鲜蔬菜  新鲜蔬菜新鲜蔬菜',
        status: '已售后'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var systemInfo = wx.getSystemInfoSync();
    this.setData({
      windowHeight : systemInfo.windowHeight
    });
    this.fun()
  },
  fun(){
    console.log(this.data.applyAftersaleList);
    list = this.data.applyAftersaleList
    let that = this
    let newArr = [];
    for (let i = 0; i < this.data.applyAftersaleList.length; i++) {
      this.data.applyAftersaleList[i].len = this.data.applyAftersaleList[i].images.length;
    }
    console.log(this.data.applyAftersaleList);
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

  //点击申请售后
  applyAftersale() {
    this.setData({
      currentindex: 0
    })
  },
  //点击售后记录
  afterSalelist() {
    this.setData({
      currentindex: 1
    })
  },
   //监听滑动
  switchChange:function(e){
    this.setData({
      currentindex : e.detail.current
    })
  },

  // 点击申请售后
  applyaftersaleTap:function(e){
    console.log('点击申请售后')
    var index = e.currentTarget.dataset.index;
    var list = this.data.applyAftersaleList;
    if(index!=="" && index != null)
    {
      console.log('点击申请售后index')
      console.log(list[index])
      wx.navigateTo({
        url: '../applyaftersalelist/index',
      })
    }
  }

})