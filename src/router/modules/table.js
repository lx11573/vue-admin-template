/** When your routing table is too long, you can split it into small modules **/

import Demo from '@/views/demo/demo'

const tableRouter = {
  path: '/table',
  component: Demo,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: '表格',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/demo/table/dynamic-table/index'),
      name: 'DynamicTable',
      meta: { title: '动态表格' }
    },
    {
      path: 'drag-table',
      component: () => import('@/views/demo/table/drag-table'),
      name: 'DragTable',
      meta: { title: 'Drag Table' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/demo/table/inline-edit-table'),
      name: 'InlineEditTable',
      meta: { title: 'Inline Edit' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/demo/table/complex-table'),
      name: 'ComplexTable',
      meta: { title: '综合表格' }
    }
  ]
}
export default tableRouter
