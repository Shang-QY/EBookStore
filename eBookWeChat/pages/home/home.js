// pages/home/home.js
const bookService = require('../../service/bookService')

Page({
  data: {
    background: ['../../images/book1.jpg', '../../images/book2.jpg', '../../images/book3.jpg', '../../images/book4.jpg'],
    books: [],
    list: [{
        text: '新品推荐',
        iconPath: '/images/tabbar1/new.svg',
        selectedIconPath: '/images/tabbar1/new.svg',
        badge: '4'
      },
      {
        text: '爆款热销',
        iconPath: '/images/tabbar1/hot.svg',
        selectedIconPath: '/images/tabbar1/hot.svg',
        badge: '2'
      },
      {
        text: '团购好物',
        iconPath: '/images/tabbar1/tuan.svg',
        selectedIconPath: '/images/tabbar1/tuan.svg'
      }
    ]
  },

  onBookClick(e) {
    const {id} = e.currentTarget.dataset
    console.log(id);
    wx.navigateTo({
      url: '../book/book?id=' + id
    })
  },

  onLoad: function (options) {
    const callback = (data) => {
      this.setData({books:data});
    }
    bookService.getBooks(callback);
  },
})