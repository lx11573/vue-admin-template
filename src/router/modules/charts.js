/** When your routing table is too long, you can split it into small modules**/

import Demo from '@/views/demo/demo'

const chartsRouter = {
  path: '/charts',
  component: Demo,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: '图表',
    icon: 'chart'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/demo/charts/keyboard'),
      name: 'KeyboardChart',
      meta: { title: '键盘图', noCache: true }
    },
    {
      path: 'line',
      component: () => import('@/views/demo/charts/line'),
      name: 'LineChart',
      meta: { title: '折线图', noCache: true }
    },
    {
      path: 'mix-chart',
      component: () => import('@/views/demo/charts/mix-chart'),
      name: 'MixChart',
      meta: { title: '柱状图', noCache: true }
    }
  ]
}

export default chartsRouter
