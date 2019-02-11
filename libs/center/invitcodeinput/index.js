// libs/center/invitcodeinput/index.js
Component({
   
   externalClasses:['i-class','i-class-mask'],

   
  /**
   * 组件的属性列表
   */
  properties: {
        visible: {
          type: Boolean,
          value: false
        },
        title: {
          type: String,
          value: ''
        },
        showOk: {
          type: Boolean,
          value: true
        },
        showCancel: {
          type: Boolean,
          value: true
        },
        okText: {
          type: String,
          value: '确定'
        },
        cancelText: {
          type: String,
          value: '取消'
        },
        // 按钮组，有此值时，不显示 ok 和 cancel 按钮
        actions: {
          type: Array,
          value: []
        },
        // horizontal || vertical
        actionMode: {
          type: String,
          value: 'horizontal'
        }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClickItem({ currentTarget = {} }) {
      const dataset = currentTarget.dataset || {};
      const { index } = dataset;
      this.triggerEvent('click', { index });
    },
     handleClickOk(){
       this.triggerEvent('ok');
     },
     handleClickCancel(){
       this.triggerEvent('cancel');
     }
  }
})
