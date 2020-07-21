// components/order/order.js
const orderService = require('../../service/orderService')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderID:{type:Number},
    orderDate:{type:String}
  },

  /**
   * 组件的初始数据
   */
  data: {
    orderItems:[]
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      const callback = (data) => {
        console.log(data);
        this.setData({
          orderItems: data
        });
      }
      orderService.getOrderItems(this.properties.orderID, callback);
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
