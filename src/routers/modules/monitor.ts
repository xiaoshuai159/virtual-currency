/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const monitorRouter = [
  {
    path: '/monitor',
    component: Layout,
    redirect: '/monitor/productMonitorPage',
    name: 'productMonitorPage',
    meta: {
      title: '挖矿生产监测',
      icon: 'WarnTriangleFilled',
    },
    children: [
      {
        path: '/monitor/productMonitorPage',
        component: () => import('@/views/monitor/productMonitorPage.vue'),
        name: 'productMonitorPage',
        meta: { title: '挖矿生产监测', breadcrumb: false, icon: 'WarnTriangleFilled' },
      },
    ],
  },
  {
    path: '/monitor',
    component: Layout,
    redirect: '/monitor/convertMonitorPage',
    name: 'convertMonitorPage',
    meta: {
      title: '法币兑换监测',
      icon: 'Money',
    },
    children: [
      {
        path: '/monitor/convertMonitorPage',
        component: () => import('@/views/monitor/convertMonitorPage.vue'),
        name: 'convertMonitorPage',
        meta: { title: '法币兑换监测', breadcrumb: false, icon: 'Money' },
      },
    ],
  },
  {
    path: '/monitor',
    component: Layout,
    redirect: '/monitor/dealMonitorPage',
    name: 'dealMonitorPage',
    meta: {
      title: '链上交易监测',
      icon: 'CreditCard',
    },
    children: [
      {
        path: '/monitor/dealMonitorPage',
        component: () => import('@/views/monitor/dealMonitorPage.vue'),
        name: 'dealMonitorPage',
        meta: { title: '链上交易监测', breadcrumb: false, icon: 'CreditCard' },
      },
    ],
  },
]

export default monitorRouter
