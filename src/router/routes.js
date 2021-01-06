import Layout from '@/layout'
export default [
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: { title: '登录' },
    hidden: true
  },
  {
    path: '/',
    name: '_dashboard',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard'),
        name: 'dashboard',
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  }
  // {
  //   path: '/',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'editor',
  //       component: () => import('@/views/editor'),
  //       name: 'editor',
  //       meta: { title: '代码编辑', icon: 'code' }
  //     }
  //   ]
  // }
]
