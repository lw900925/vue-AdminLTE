// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// Import css
import '@/plugins/bootstrap-3.3.6/css/bootstrap.min.css'
import '@/plugins/font-awesome-4.6.3/css/font-awesome.min.css'
import '@/plugins/ionicons-2.0.0/css/ionicons.min.css'
import '@/plugins/select2-4.0.3/css/select2.min.css'
import '@/plugins/iCheck-1.0.1/all.css'
import '@/plugins/AdminLTE-2.3.11/css/AdminLTE.min.css'
import '@/plugins/AdminLTE-2.3.11/css/skins/_all-skins.min.css'

import '@/plugins/DataTables-1.10.13/media/css/dataTables.bootstrap.min.css'
import '@/plugins/DataTables-1.10.13/extensions/Buttons/css/buttons.dataTables.min.css'
import '@/plugins/DataTables-1.10.13/extensions/Buttons/css/buttons.bootstrap.min.css'
import '@/plugins/DataTables-1.10.13/extensions/Select/css/select.dataTables.min.css'
import '@/plugins/DataTables-1.10.13/extensions/Select/css/select.bootstrap.min.css'
import '@/plugins/DataTables-1.10.13/extensions/Scroller/css/scroller.dataTables.min.css'
import '@/plugins/DataTables-1.10.13/extensions/Scroller/css/scroller.bootstrap.min.css'
import '@/plugins/DataTables-1.10.13/extensions/Editor-1.6.1/css/editor.bootstrap.min.css'

// import javascript
import '@/plugins/jQuery-2.2.3/jquery.min'
import '@/plugins/bootstrap-3.3.6/js/bootstrap.min'
import '@/plugins/select2-4.0.3/js/select2.full.min'
import '@/plugins/iCheck-1.0.1/icheck.min'
import '@/plugins/AdminLTE-2.3.11/js/app.min'
import '@/plugins/tinymce-4.7.13/tinymce.min'
import '@/plugins/tinymce-4.7.13/jquery.tinymce.min'
import '@/plugins/tinymce-4.7.13/themes/modern/theme.min'

import '@/plugins/DataTables-1.10.13/media/js/jquery.dataTables.min'
import '@/plugins/DataTables-1.10.13/media/js/dataTables.bootstrap.min'
import '@/plugins/DataTables-1.10.13/extensions/Buttons/js/dataTables.buttons.min'
import '@/plugins/DataTables-1.10.13/extensions/Buttons/js/buttons.bootstrap.min'
import '@/plugins/DataTables-1.10.13/extensions/Buttons/js/buttons.flash.min'
import '@/plugins/DataTables-1.10.13/extensions/Buttons/js/buttons.html5.min'
import '@/plugins/DataTables-1.10.13/extensions/Buttons/js/buttons.print.min'
import '@/plugins/DataTables-1.10.13/extensions/Select/js/dataTables.select.min'
import '@/plugins/DataTables-1.10.13/extensions/Scroller/js/dataTables.scroller.min'
import '@/plugins/DataTables-1.10.13/extensions/Editor-1.6.1/js/dataTables.editor.min'
import '@/plugins/DataTables-1.10.13/extensions/Editor-1.6.1/js/editor.bootstrap.min'

import '@/plugins/DataTables-1.10.13/extensions/Editor-1.6.1/plugins/editor.select2'

import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App'
import router from './router'
import axios from './axios'
import Constants from "@/utils/constants"

// 引入自定义指令
import MyDirective from '@/directives/my-directive'

Vue.use(VueCookies);

// Vue global settings
Vue.config.productionTip = false;

// 全局路由拦截事件
router.beforeEach((to, from, next) => {
    // 判断跳转的目标路由是否有登陆权限
    if (!to.meta.ignore) {
        // 检查是否有token信息
        if (window.$cookies.isKey(Constants.api.tokenKey)) {
            next()
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next()
    }
});

// 绑定Vue自定义指令
Vue.directive(MyDirective.name, MyDirective);

// 绑定Vue自定义组件

new Vue({
    el: '#app',
    router,
    axios,
    template: '<App />',
    components: {App}
});

