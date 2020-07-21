// pages/book/book.js
const bookService = require('../../service/bookService')
const cartService = require('../../service/cartService')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookInfo: null,
    isShow: false,
    currentOpt: "",
    num: 1,
    cantSub: true,
    showTopTips: false,
    successInfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const callback = (data) => {
      this.setData({bookInfo:data})
    }
    bookService.getBook(options.id, callback);
  },

  addToCart: function () {
    this.setData({
      isShow: true,
      currentOpt: "加入购物车"
    })
  },

  buyNow: function () {
    this.setData({
      isShow: true,
      currentOpt: "立即购买"
    })
  },

  /*点击减号*/
  bindMinus: function () {
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    let ban = false;
    if (num == 1) ban = true;
    this.setData({
      num: num,
      cantSub: ban
    })
  },

  /*点击加号*/
  bindPlus: function () {
    var num = this.data.num;
    num++;
    let ban = true;
    if (num > 1) ban = false;
    this.setData({
      num: num,
      cantSub: ban
    })
  },

  onCancelOrder: function () {
    this.setData({
      isShow: false,
      currentOpt: "",
      num: 1,
      cantSub: true
    })
  },

  //TODO: 只写了加入购物车的操作处理
  onSubmitOrder: function () {
    cartService.addOrderItem(this.data.bookInfo.bookId, this.data.num, wx.getStorageSync('userId'));
    this.setData({
      isShow: false,
      currentOpt: "",
      num: 1,
      cantSub: true,
      showTopTips: true,
      successInfo: '宝贝在购物车等您～'
    })
  }
})