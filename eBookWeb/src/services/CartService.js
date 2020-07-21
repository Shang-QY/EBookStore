import config from 'config';
import {postRequest, getRequest} from "../utils/ajax";


export const getCart = (userId, callback) => {
    const url = `${config.apiUrl}/cart/findCart/` + userId;
    getRequest(url, callback);
};

export const addOrderItem = (bookId, amount, userID) => {
    const url = `${config.apiUrl}/cart/addCartItem/` + bookId + '/' + amount + '/' + userID;
    postRequest(url, {}, console.log());
};

export const addCartToOrder = (userID, callback) => {
    const url = `${config.apiUrl}/cart/addCartToOrder/` + userID;
    postRequest(url, {}, callback);
};

export const deleteCartItem = (userID, orderItemID, callback) => {
    const url = `${config.apiUrl}/cart/delete/` + userID + '/' + orderItemID;
    postRequest(url, {}, callback);
};

export const changeItemAmount = (orderItemID, amount, callback) => {
    const url = `${config.apiUrl}/cart/changeAmount/` + orderItemID + '/' + amount;
    postRequest(url, {}, callback);
};

