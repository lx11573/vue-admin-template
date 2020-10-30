import Layout from '@/layout/index'

export const sysRouter = {
  path: '/sys',
  component: Layout,
  redirect: 'noRedirect',
  alwaysShow: true,
  name: 'sys',
  meta: {
    title: '系统管理',
    icon: 'el-icon-s-tools'
  },
  children: [
    {
      path: 'permissions',
      component: () => import('@/views/pages/sys/permissions'),
      name: 'Permissions',
      meta: {
        title: '权限管理'
      }
    }
  ]
}

