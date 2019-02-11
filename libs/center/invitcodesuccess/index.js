// libs/center/invitcodesuccess/index.js
Component({

  externalClasses: ['i-class', 'i-class-mask'],


  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    bottomtitle: {
      type: String,
      value: ''
    },
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
    handleClickOk() {
      this.triggerEvent('ok');
    },
    handleClickCancel() {
      this.triggerEvent('cancel');
    }
  }
})
