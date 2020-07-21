import config from 'config';
import {getRequest, postRequest} from "../utils/ajax";
import {history} from '../utils/history';
import {message} from 'antd';

export const signUp = (data, callback) => {
    console.log(data);
    const url = `${config.apiUrl}/signUp`;
    postRequest(url, data, callback);
};

export const login = (data, callback) => {
    const url = `${config.apiUrl}/login`;
    postRequest(url, data, callback);
};

export const logout = () => {
    sessionStorage.removeItem("user");
    history.push("/login");
};

export const getAllUser = (callback) => {
    const url = `${config.apiUrl}/getAllUsers`;
    getRequest(url, callback);
};

export const changeBanState = (userId) => {
    const url = `${config.apiUrl}/changeBanState/` + userId;
    postRequest(url, {}, ()=>{})
};

