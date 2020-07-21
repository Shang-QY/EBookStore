import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";


export const getBooks = (data, callback) => {
    const url = `${config.apiUrl}/getBooks`;
    postRequest(url, data, callback);
};

export const getBook = (id, callback) => {
    const data = {id: id};
    const url = `${config.apiUrl}/getBook`;
    postRequest_v2(url, data, callback);

};

export const changeOnesInfo = (data, callback) => {
    console.log(data);
    const url = `${config.apiUrl}/changeOnesInfo`;
    postRequest(url, data, callback);
};

export const deleteOneBook = (id, callback) => {
    const url = `${config.apiUrl}/deleteOneBook/` + id;
    postRequest(url, {}, callback);
};

export const insertNewBook = (data, callback) => {
    const url = `${config.apiUrl}/insertNewBook`;
    postRequest(url, data, callback);
};
