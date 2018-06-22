import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Constants from './utils/constants';

// vue-axios global settings
axios.defaults.baseURL = Constants.api.baseURI;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.interceptors.request.use(config => {
    // 从cookie中取出access_token
    const access_token = window.$cookies.get(Constants.api.tokenKey);
    config.headers.Authorization = "Bearer " + access_token;
    return config
}, error => {
    return Promise.reject(error)
});

axios.interceptors.response.use(response => {
    console.log(response);
}, error => {
    if (error && error.response) {
        // 处理错误
        switch (error.response.status) {
            case 400 :
                break;
            case 500 :
                break;
            case 401 :
                break;
            default:
        }
    }

    return Promise.reject(error);
});

Vue.use(VueAxios, axios);

export default {}
