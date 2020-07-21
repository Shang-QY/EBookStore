export const postRequest = (url, json, callback) => {
  console.log(url);
  wx.request({
    url: url,
    method: "POST",
    data: json,
    header: {
      'content-type': 'application/json',
    },
    success(res) {
      console.log(res);
      callback(res.data);
    }
  });
};

export const getRequest = (url, callback) => {
  console.log(url);
  wx.request({
    url: url,
    method: "GET",
    header: {
      'content-type': 'application/json',
    },
    success(res) {
      console.log(res);
      callback(res.data);
    },
    fail(){
      wx.showToast({
        title: '服务器端错误',
        icon: 'none',
        duration: 2000
      })
    }
  });
};