import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

// vue-axios global settings
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTc2NDg1MDgsInVzZXJfbmFtZSI6InVzZXIiLCJhdXRob3JpdGllcyI6WyJVU0VSIiwiQUNUVUFUT1IiXSwianRpIjoiYzg2NTY1ZDYtNTM3NS00ZGRkLWJlYmYtMmUxODJhMzAzMTYwIiwiY2xpZW50X2lkIjoiOTQ5ODQ3OTYiLCJzY29wZSI6WyJhcHAiXX0.HzoZha0RRAwfU_zZVPXdRJrmaPT_7KYSoFDy90ky43YJlCxB7ruuZ5qOxIiWTO3n0W7bEwNB9ErtWtoEEfjONTPHoD7_RvHPPENBQLpvJRDef0tkBtzjtmBvj9p9jaY83JtG8UQ0mevlw3aggQnoWrEpo79xm4BMnhzWhBvWZLSPEgaWW1Nu1CbJJ_HaOVuF40AYCO0y5QEMwmQjfjyiuFDWi2ih5pfQcDJeyd6wtgXk__WVYAxwZFrQ5D2kU4rcbliQDwQt-OKWtWbxHUQ0n4oZ7A1ju5r68t7MkWLa4FTZhRNzf4SLq19YsOv6YvcUYrp1RbGltcm9NjvsaOnG2Q'
    return config
}, error => {
    return Promise.reject(error)
})

Vue.use(VueAxios, axios)

export default {}
