// components/bottumbar/bottumbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    curr:{type:String}
  },

  /**
   * 组件的初始数据
   */
  data: {
    list_bottom: [{
      text: '首页',
      iconPath: '/images/tabbar2/home.svg',
      selectedIconPath: '/images/tabbar2/home_active.svg',
    },
    {
      text: '购物车',
      iconPath: '/images/tabbar2/cart.svg',
      selectedIconPath: '/images/tabbar2/cart_active.svg',
    },
    {
      text: '订单',
      iconPath: '/images/tabbar2/dingdan.svg',
      selectedIconPath: '/images/tabbar2/dingdan_active.svg',
    },
    {
      text: '我的',
      iconPath: '/images/tabbar2/me.svg',
      selectedIconPath: '/images/tabbar2/me_active.svg'
    }
  ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabChange(e) {
      console.log('tab change', e.detail)
      switch (e.detail.index) {
        case 0:
          wx.redirectTo({
            url: '../home/home'
          })
        case 1:
          wx.redirectTo({
            url: '../cart/cart'
          })
        case 2:
          wx.redirectTo({
            url: '../order/order'
          })
        case 3:
          wx.redirectTo({
            url: '../profile/profile'
          })
        default:
          break;
      }
    },
  }
})
