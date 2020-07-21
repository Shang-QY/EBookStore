const ajax = require('../utils/ajax.js')

export const getCart = (userId, callback) => {
  const url = 'http://localhost:8080/cart/findCart/' + userId;
  ajax.getRequest(url, callback);
};

export const addOrderItem = (bookId, amount, userID) => {
  const url = 'http://localhost:8080/cart/addCartItem/' + bookId + '/' + amount + '/' + userID;
  ajax.postRequest(url, {}, console.log);
};

export const addCartToOrder = (userID, callback) => {
  const url = 'http://localhost:8080/cart/addCartToOrder/' + userID;
  ajax.postRequest(url, {}, callback);
};

export const deleteCartItem = (userID, orderItemID, callback) => {
  const url = 'http://localhost:8080/cart/delete/' + userID + '/' + orderItemID;
  ajax.postRequest(url, {}, callback);
};

export const changeItemAmount = (orderItemID, amount, callback) => {
  const url = 'http://localhost:8080/cart/changeAmount/' + orderItemID + '/' + amount;
  ajax.postRequest(url, {}, callback);
};