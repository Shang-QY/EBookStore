import config from 'config';
import { getRequest } from "../utils/ajax";


export const getOrders = (userId, callback) => {
    const url = `${config.apiUrl}/order/findOnesOrder/` + userId;
    getRequest(url, callback);
};

export const getOrderItems = (orderID, callback) => {
    const url = `${config.apiUrl}/order/findOrderItems/` + orderID;
    getRequest(url, callback);
};

export const getAllOrders = (callback) => {
    const url = `${config.apiUrl}/order/findAllOrders/`;
    getRequest(url, callback);
};



