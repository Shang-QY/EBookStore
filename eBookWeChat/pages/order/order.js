// pages/order/order.js
const orderService = require('../../service/orderService')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const callback = (data) => {
      this.setData({
        orders: data
      });
    }
    orderService.getOrders(wx.getStorageSync('userId'), callback);
  }
})