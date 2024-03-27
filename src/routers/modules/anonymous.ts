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
        meta: { title: '反匿名查询', icon: 'CircleCheck' },
      },
    ],
  },
]
export default anonymousRouter
