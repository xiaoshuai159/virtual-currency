import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory, Router } from 'vue-router'
import Layout from '@/layout/index.vue'

// 扩展继承属性
interface extendRoute {
  hidden?: boolean
}

import monitorRouter from './modules/monitor'
import anonymousRouter from './modules/anonymous'

// 异步组件
export const asyncRoutes = [...monitorRouter, ...anonymousRouter]

/**
 * path ==> 路由路径
 * name ==> 路由名称
 * component ==> 路由组件
 * redirect ==> 路由重定向
 * alwaysShow ==> 如果设置为true，将始终显示根菜单，无论其子路由长度如何
 * hidden ==> 如果“hidden:true”不会显示在侧边栏中（默认值为false）
 * keepAlive ==> 设为true 缓存
 * meta ==> 路由元信息
 * meta.title ==> 路由标题
 * meta.icon ==> 菜单icon
 * meta.affix ==> 如果设置为true将会出现在 标签栏中
 * meta.breadcrumb ==> 如果设置为false，该项将隐藏在breadcrumb中（默认值为true）
 * meta.activeMenu ==> 详情页的时候可以设置菜单高亮 ,高亮菜单的path
 */

export const constantRoutes: Array<RouteRecordRaw & extendRoute> = [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/errorPages/404.vue'),
    hidden: true,
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/errorPages/403.vue'),
    hidden: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
    meta: { title: '登录' },
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    meta: { title: '交易软件用户监测', icon: 'Odometer' },
    children: [
      {
        path: '/home',
        component: () => import('@/views/monitor/userMonitorPage.vue'),
        name: 'home',
        meta: { title: '交易软件用户监测', icon: 'Odometer', breadcrumb: false, role: ['other'] },
      },
    ],
  },
  {
    path: '/anonymous',
    component: Layout,
    redirect: '/anonymous/searchPage',
    name: 'searchPage',
    meta: {
      title: '反匿名查询',
      icon: 'CircleCheck',
    },
    hidden: true,
    children: [
      {
        path: '/anonymous/searchPage',
        component: () => import('@/views/anonymous/searchPage.vue'),
        name: 'searchPage',
        meta: { title: '反匿名查询', breadcrumb: false, icon: 'CircleCheck' },
      },
      {
        path: '/anonymous/ipSearchPage',
        component: () => import('@/views/anonymous/ipSearchPage.vue'),
        name: 'ipSearchPage',
        meta: { title: 'IP地址查询' },
        hidden: true,
      },
      {
        path: '/anonymous/nameSearchPage',
        component: () => import('@/views/anonymous/nameSearchPage.vue'),
        name: 'nameSearchPage',
        meta: { title: '昵称查询' },
        hidden: true,
      },
      {
        path: '/anonymous/infoSearchPage',
        component: () => import('@/views/anonymous/infoSearchPage.vue'),
        name: 'infoSearchPage',
        meta: { title: '实名信息查询' },
        hidden: true,
      },
      {
        path: '/anonymous/chainSearchPage',
        component: () => import('@/views/anonymous/chainSearchPage.vue'),
        name: 'chainSearchPage',
        meta: { title: '链上地址查询' },
        hidden: true,
      },
    ],
  },
]

/**
 * notFoundRouter(找不到路由)
 */
export const notFoundRouter = {
  path: '/:pathMatch(.*)',
  name: 'notFound',
  redirect: '/404',
}

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL), // history
  history: createWebHashHistory(), // hash
  routes: constantRoutes,
})

export default router
