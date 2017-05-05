// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/plugins/bootstrap-3.3.6/css/bootstrap.min.css'
import '@/plugins/font-awesome-4.6.3/css/font-awesome.min.css'
import '@/plugins/ionicons-2.0.0/css/ionicons.min.css'
import '@/plugins/AdminLTE-2.3.11/css/AdminLTE.min.css'
import '@/plugins/AdminLTE-2.3.11/css/skins/_all-skins.min.css'
import '@/plugins/iCheck-1.0.1/all.css'

import '@/plugins/jQuery-2.2.3/jquery.min'
import '@/plugins/bootstrap-3.3.6/js/bootstrap.min'
import '@/plugins/AdminLTE-2.3.11/js/app.min'
import '@/plugins/iCheck-1.0.1/icheck.min'

import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: { App }
});

router.beforeEach((to, from, next) => {
  // 判断跳转的目标路由是否有登陆权限
  if (to.meta.auth) {
    // 检查是否有token信息
    console.log(sessionStorage.getItem('TOKEN'));
    if (sessionStorage.getItem('TOKEN')) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    }

  } else {
    next();
  }
});
