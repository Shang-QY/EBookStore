// pages/login/login.js
const userService = require('../../service/userService')

Page({
  data: {
    username: '',
    password: '',
    showTopTips: false,
    error: ''
  },

  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    if (field == 'username') {
      this.setData({
        username: e.detail.value
      });
    } else if (field == 'password') {
      this.setData({
        password: e.detail.value
      });
    }
  },

  submitForm() {
    if (this.data.username.length == 0 || this.data.password.length == 0) {
      this.setData({
        showTopTips: true,
        error: "用户名和密码不能为空"
      })
    } else {
      const callback = (data) => {
        console.log(data);
        if (data.userType !== -1) {
          wx.setStorageSync("userId", data.userId);
          wx.navigateTo({
            url: '../home/home'
          })
        } else {
          this.setData({
            "showTopTips": true,
            "error": "用户名或密码错误"
          });
        }
      }
      userService.login(this.data.username, this.data.password, callback);
    }
  }
})