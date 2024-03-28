import Layout from '@/layout/index.vue'

const anonymousRouter = [
  {
    path: '/anonymous',
    component: Layout,
    redirect: '/anonymous/searchPage',
    name: 'searchPage',
    meta: {
      title: '反匿名查询',
      icon: 'CircleCheck',
    },
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
export default anonymousRouter
