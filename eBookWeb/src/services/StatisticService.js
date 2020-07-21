import config from 'config';
import { getRequest } from "../utils/ajax";


export const getSaleOfBook = (date1, date2, callback) => {
    const url = `${config.apiUrl}/statistic/saleOfBook/` + date1 + '/' + date2;
    getRequest(url, callback);
};

export const getSaleOfUser = (date1, date2, callback) => {
    const url = `${config.apiUrl}/statistic/saleOfUser/` + date1 + '/' + date2;
    getRequest(url, callback);
};

export const getBuyOfBook = (date1, date2, userID, callback) => {
    const url = `${config.apiUrl}/statistic/buyOfBook/` + date1 + '/' + date2 + '/' + userID;
    getRequest(url, callback);
};



