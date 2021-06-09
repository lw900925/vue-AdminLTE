/**
 * Created by liuwei on 2017/5/8.
 */
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
import PageNotFound from '@/components/PageNotFound'

import User from '@/components/system/User'
import Role from '@/components/system/Role'
import Resource from '@/components/system/Resource'

import Profile from '@/components/Profile'

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
                    component: Dashboard,
                    meta: {
                        name: "仪表盘"
                    }
                },

                // 系统管理
                {
                    path: '/system/user',
                    component: User,
                    meta: {
                        name: "用户"
                    }
                },
                {
                    path: '/system/role',
                    component: Role,
                    meta: {
                        name: "角色"
                    }
                },
                {
                    path: '/system/resource',
                    component: Resource,
                    meta: {
                        name: "资源"
                    }
                },

                {
                    path: '/:username/profile',
                    component: Profile,
                    meta: {
                        name: "首选项"
                    }
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
