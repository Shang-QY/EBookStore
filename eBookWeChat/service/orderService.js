const ajax = require('../utils/ajax.js')

export const getOrders = (userId, callback) => {
  const url = 'http://localhost:8080/order/findOnesOrder/' + userId;
  ajax.getRequest(url, callback);
};

export const getOrderItems = (orderID, callback) => {
  const url = 'http://localhost:8080/order/findOrderItems/' + orderID;
  ajax.getRequest(url, callback);
};
