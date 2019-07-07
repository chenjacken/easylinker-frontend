// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/home/index',
    children: [
      {
        path: '/home',
        name: 'Home',
        redirect: '/home',
        component: RouteView,
        meta: { title: '控制中心', keepAlive: true, icon: bxAnaalyse },
        children: [
          {
            path: '/home/index',
            name: 'Index',
            component: () => import('@/views/Home'),
            meta: { title: '欢迎', keepAlive: true }
          }
        ]
      },
      {
        path: '/device',
        name: 'Device',
        redirect: '/device/list',
        component: RouteView,
        meta: { title: '设备管理', keepAlive: true, icon: bxAnaalyse },
        children: [
          {
            path: '/device/list',
            name: 'DeviceList',
            component: () => import('@/views/Device/List'),
            meta: { title: '设备列表', keepAlive: true }
          },
          {
            path: '/device/create',
            name: 'DeviceCreate',
            component: () => import('@/views/Device/Create'),
            meta: { title: '创建设备', keepAlive: true }
          }
        ]
      },
      {
        path: '/sence',
        name: 'Sence',
        redirect: '/sence/list',
        component: RouteView,
        meta: { title: '场景管理', keepAlive: true, icon: bxAnaalyse },
        children: [
          {
            path: '/sence/list',
            name: 'SenceList',
            component: () => import('@/views/Sence/List'),
            meta: { title: '场景列表', keepAlive: true }
          },
          {
            path: '/sence/create',
            name: 'SenceCreate',
            component: () => import('@/views/Sence/Create'),
            meta: { title: '创建场景', keepAlive: true }
          }
        ]
      },
      {
        path: '/system',
        name: 'System',
        redirect: '/system/user',
        component: RouteView,
        meta: { title: '系统管理', keepAlive: true, icon: bxAnaalyse },
        children: [
          {
            path: 'user',
            name: 'SystemUser',
            component: () => import('@/views/Home'),
            meta: { title: '用户中心', keepAlive: true }
          },
          {
            path: 'user',
            name: 'SystemSetting',
            component: () => import('@/views/Home'),
            meta: { title: '系统设置', keepAlive: true }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/User/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/User/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/User/RegisterResult')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/Exception/404')
  }
]
