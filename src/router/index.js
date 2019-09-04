import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/views/common/layout/Layout'
import upms from '@/router/upms/index.js'
import adm from '@/router/adm/index.js'
import personnel from '@/router/personnel/index.js'
import power from '@/router/power/index.js'
Vue.use(Router)

//import sys from '@/router/tgpt/sys/index'


/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [

    {path: '/', redirect: '/common/index', hidden: true},
    {path: '/index', redirect: '/common/storeIndex', hidden: true},
    {path: '/login', component: () => import('@/views/common/login/index'), hidden: true},
    {path: '/register', component: () => import('@/views/common/register/index'), hidden: true},
    {path: '/forget', component: () => import('@/views/common/forget/index'), hidden: true},
    {path: '/404', component: () => import('@/views/common/404'), hidden: true},
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        meta: {
            noCache: true //如果设置为true ,则不会被 <keep-alive> 缓存(默认 false)
        },
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/common/redirect/index')
            }
        ]
    },
]

export const authRouterMap = [
    {
        path: '/default',
        component: Layout,
        name: '首页',
        children: [
            {
                path: '/default/index',
                name: 'default',
                component: () => import('@/views/common/dashboard/admin/default'),
                meta: {title: '首页', icon: 'index'}
            }
        ]
    },
    {
        path: '/index',
        component: Layout,
        name: '商户工作台',
        children: [
            {
                path: '/common/storeIndex',
                name: 'index',
                component: () => import('@/views/common/dashboard/admin/index_store'),
                meta: {title: '商户工作台', icon: 'index'}
            }
        ]
    },
    {
        path: '/',
        component: Layout,
        name: '管理工作台',
        children: [
            {
                path: '/common/index',
                name: 'index',
                component: () => import('@/views/common/dashboard/admin/index'),
                meta: {title: '管理工作台', icon: 'index'}
            }
        ]
    },
    /*权限管理*/
    upms,
    adm,
    personnel,
    power,
    {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})

