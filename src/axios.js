import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Constants from './utils/constants'

// vue-axios global settings
axios.defaults.baseURL = Constants.api.baseURI
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjU4Nzk0NjAsInVzZXJfbmFtZSI6Imx3OTAwOTI1IiwiYXV0aG9yaXRpZXMiOlsiVVNFUiIsIkFETUlOIl0sImp0aSI6IjJjMWYzMDlkLTk4NWItNGY4Mi1iOTM5LTI5MmI0NjExZTY3MyIsImNsaWVudF9pZCI6ImNsaWVudElkIiwic2NvcGUiOlsiYXBwIl19.pFS5Z70yp7Yr_e8kCN_89ekIvFtRZOLQmt_T4SZ8KMKJZvWE65NZ9y7AV9d-6PQJ5GFl906AQqtDkMCbbfesPXfkVSg44euZnBvmoMF2oAC68SzW7QOFdQBcTaEe-9DRs5M3VKN9P-AFr86fWwZj-tTt3Op3qpRd7rbgN51bDGJW_SsfBmMjc4GLqrwqQDW09OMu-DDcNjOQW6rJwKBvP2m1y1jpCB2EjvHjMnX3cM1A9DNFScaE3MRTbt44nthtcuURsUL9_9Xu0stdATHauosR_72eY2Z9c6DuWVEjhZ6RqtYZdUIazrQkM-mb6XcN65No4UtxH8NjDQN5JJmvhw'
    return config
}, error => {
    return Promise.reject(error)
})

Vue.use(VueAxios, axios)

export default {}
