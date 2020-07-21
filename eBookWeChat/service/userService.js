const ajax = require('../utils/ajax.js')

export const login = (username, password, callback) => {
  const url = 'http://localhost:8080/login';
  let data = {
    username: username,
    password: password
  }
  ajax.postRequest(url, data, callback);
}