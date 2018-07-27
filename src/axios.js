import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Constants from './utils/constants';
import router from './router'

// vue-axios global settings
axios.defaults.baseURL = Constants.api.baseURI;

axios.interceptors.request.use(config => {
    // 从cookie中取出access_token
    const access_token = window.$cookies.get(Constants.api.tokenKey);
    config.headers.Authorization = "Bearer " + access_token;
    return config
}, error => {
    return Promise.reject(error)
});

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error && error.response) {
        // 处理错误
        switch (error.response.status) {
            case 400 :
                break;
            case 500 :
                break;
            case 401 :
                // 请求未认证，跳转到登陆界面
                router.push({
                    path: "/login",
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                });
                break;
            case 409:
                // 请求的对象已经存在
                alert("请求对象已经存在");
            default:
        }
    }

    return Promise.reject(error);
});

Vue.use(VueAxios, axios);

export default {}
