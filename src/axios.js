import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Constants from './utils/constants';
import router from './router'
import toastr from "toastr";

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
                if (error.response.data["error"] === "invalid_grant") {
                    toastr.error(Constants.message.http.BAD_CREDENTIALS);
                } else {
                    toastr.error(error.response.data["message"]);
                }
                break;
            case 500 :
                toastr.error(Constants.message.http.INTERNAL_SERVER_ERROR);
                break;
            case 401 :
                // 请求未认证，跳转到登陆界面
                router.push({
                    path: "/login",
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                });
                toastr.error(Constants.message.http.UNAUTHORIZED);
                break;
            case 409:
                // 请求的对象已经存在
                toastr.error(Constants.message.http.CONFLICT);
            default:
        }
    }

    return Promise.reject(error);
});

Vue.use(VueAxios, axios);

export default {}
