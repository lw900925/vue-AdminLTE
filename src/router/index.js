import Vue from 'vue'
import VueRouter from 'vue-router'

// 页面布局元素
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import Footer from '@/components/layout/Footer'
import ControlSidebar from '@/components/layout/ControlSidebar'
import Content from '@/components/layout/Content'

// 自定义组件
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        header: Header,
        sidebar: Sidebar,
        footer: Footer,
        controlSidebar: ControlSidebar,
        default: Content
      },
      children: [
        {
          path: '/dashboard',
          component: Dashboard,
          meta: {
            auth: true
          }
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
