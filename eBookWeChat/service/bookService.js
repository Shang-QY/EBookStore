const ajax = require('../utils/ajax.js')

export const getBooks = (callback) => {
  const url = 'http://localhost:8080/getBooks';
  ajax.postRequest(url, {}, callback);
};

export const getBook = (id, callback) => {
  const url = 'http://localhost:8080/getBook?id=' + id;
  ajax.postRequest(url, {}, callback);
};