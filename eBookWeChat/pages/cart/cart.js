// pages/cart/cart.js
const cartService = require('../../service/cartService')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartItems: [],
    option: "",
    totalPrice: 0,
    showToast: false, 
    deleteCartId: 0,
    showTopTips: false,
    successInfo: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const callback = (data) => {
      this.setData({
        cartItems: data
      });
    }
    cartService.getCart(wx.getStorageSync('userId'), callback);
  },

  onBookClick(e) {
    const {
      id
    } = e.currentTarget.dataset
    console.log(id);
    wx.navigateTo({
      url: '../book/book?id=' + id
    })
  },

  /*点击减号*/
  bindMinus: function () {
    this.setData({
      option: "sub"
    })
  },

  /*点击加号*/
  bindPlus: function () {
    this.setData({
      option: "add"
    })
  },

  changeAmount: function (e) {
    console.log('tab change', e.currentTarget.dataset);
    let eData = e.currentTarget.dataset;
    let newAmount = 0;
    // 这里我愿称之为最最最复杂，不确定的地方！
    // 1.用setData只改变cartItem数组中某一项的值时，一般语法会导致编译器报错，上网查了如下神奇语法
    // 2.对在此函数中定义，callback函数中所使用的“it”变量的作用域感到疑惑
    // 最后有惊无险，成功实现页面整体不移动，改变某书数量的效果
    let it = 'cartItems[' + eData.idx + '].amount';
    const callback = (data) => {
      console.log(data.amount);
      this.setData({
        [it]: data.amount
      })
    }
    if(this.data.option == "sub"){
      if(eData.amount == 1){
        this.setData({deleteCartId:eData.id, showToast:true});
        return;
      }
      newAmount = eData.amount - 1;
      cartService.changeItemAmount(eData.id, newAmount, callback);
    }
    else if(this.data.option == "add"){
      newAmount = eData.amount + 1;
      cartService.changeItemAmount(eData.id, newAmount, callback);
    }
  },

  close: function(){
    this.setData({
      showToast:false
    })
  },

  executeDelete: function(){
    const callback2 = (data) => {
      this.setData({
        cartItems: data,
        showToast:false,
        showTopTips: true,
        successInfo: '删除成功'
      });
    }
    const callback = (data) => {
      cartService.getCart(wx.getStorageSync('userId'), callback2);
    }
    cartService.deleteCartItem(wx.getStorageSync('userId'), this.data.deleteCartId, callback);
  },

  addCartToOrder: function(){
    const callback = (data) => {
      this.setData({
        cartItems: [],
        showTopTips: true,
        successInfo: '支付成功，稍后可在订单中查看'
      });
    }
    cartService.addCartToOrder(wx.getStorageSync('userId'), callback);
  }
})