/**
 * Created by liuwei on 2017/5/8.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

// 页面布局元素
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import ControlSidebar from '@/components/layout/ControlSidebar';
import Content from '@/components/layout/Content';

// 自定义组件
import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';
import PageNotFound from '@/components/PageNotFound';

import Enterprise from '@/components/base/Enterprise';
import Factory from '@/components/base/Factory';

import Prize from '@/components/promotion/Prize';
import Weixin from '@/components/promotion/Weixin';

Vue.use(VueRouter);

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
          component: Dashboard
        },

        // 基础信息管理
        {
          path: '/base/enterprise',
          component: Enterprise
        },
        {
          path: '/base/factory',
          component: Factory
        },


        // 营销活动
        {
          path: '/promotion/prize',
          component: Prize
        },
        {
          path: '/promotion/weixin',
          component: Weixin
        }
      ]
    },
    {
      path: '/login',
      component: Login,
      meta: {
        ignore: true
      }
    },
    {
      path: '*',
      component: PageNotFound,
      meta: {
        ignore: true
      }
    }
  ]
})
