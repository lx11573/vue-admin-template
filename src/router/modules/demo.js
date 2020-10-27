import Layout from '@/layout/index'
import Demo from '@/views/demo/demo'
import componentsRouter from '@/router/modules/components'
import chartsRouter from '@/router/modules/charts'
import nestedRouter from '@/router/modules/nested'
import tableRouter from '@/router/modules/table'

export const demoRouter = {
  path: 'demo',
  component: Layout,
  redirect: 'noRedirect',
  name: 'demo',
  meta: {
    title: '全部示例',
    icon: 'component'
  },
  children: [
    {
      path: '/guide',
      component: Demo,
      redirect: '/guide/index',
      children: [
        {
          path: 'index',
          component: () => import('@/views/demo/guide/index'),
          name: 'Guide',
          meta: { title: '引导', icon: 'guide', noCache: true }
        }
      ]
    },
    {
      path: '/profile',
      component: Demo,
      redirect: '/profile/index',
      hidden: true,
      children: [
        {
          path: 'index',
          component: () => import('@/views/demo/profile/index'),
          name: 'Profile',
          meta: { title: 'Profile', icon: 'user', noCache: true }
        }
      ]
    },
    {
      path: '/icon',
      component: Demo,
      children: [
        {
          path: 'index',
          component: () => import('@/views/demo/icons/index'),
          name: 'Icons',
          meta: { title: '图标', icon: 'icon', noCache: true }
        }
      ]
    },

    /** when your routing map is too long, you can split it into small modules **/
    componentsRouter,
    chartsRouter,
    nestedRouter,
    tableRouter,

    {
      path: '/example',
      component: Demo,
      redirect: '/example/list',
      name: 'Example',
      meta: {
        title: '示例',
        icon: 'el-icon-s-help',
        roles: ['admin']
      },
      children: [
        {
          path: 'create',
          component: () => import('@/views/demo/example/create'),
          name: 'CreateArticle',
          meta: { title: '创建文章', icon: 'edit' }
        },
        {
          path: 'edit/:id(\\d+)',
          component: () => import('@/views/demo/example/edit'),
          name: 'EditArticle',
          meta: { title: '编辑文章', noCache: true, activeMenu: '/example/list' },
          hidden: true
        },
        {
          path: 'list',
          component: () => import('@/views/demo/example/list'),
          name: 'ArticleList',
          meta: { title: '文章列表', icon: 'list' }
        }
      ]
    },

    {
      path: '/tab',
      component: Demo,
      children: [
        {
          path: 'index',
          component: () => import('@/views/demo/tab/index'),
          name: 'Tab',
          meta: { title: 'Tab', icon: 'tab' }
        }
      ]
    },

    {
      path: '/error',
      component: Demo,
      redirect: 'noRedirect',
      name: 'ErrorPages',
      meta: {
        title: '错误页面',
        icon: '404'
      },
      children: [
        {
          path: '401',
          component: () => import('@/views/error-page/401'),
          name: 'Page401',
          meta: { title: '401', noCache: true }
        },
        {
          path: '404',
          component: () => import('@/views/error-page/404'),
          name: 'Page404',
          meta: { title: '404', noCache: true }
        }
      ]
    },

    {
      path: '/error-log',
      component: Demo,
      children: [
        {
          path: 'log',
          component: () => import('@/views/error-log/index'),
          name: 'ErrorLog',
          meta: { title: '错误日志', icon: 'bug' }
        }
      ]
    },

    {
      path: '/excel',
      component: Demo,
      redirect: '/excel/export-excel',
      name: 'Excel',
      meta: {
        title: 'Excel',
        icon: 'excel'
      },
      children: [
        {
          path: 'export-excel',
          component: () => import('@/views/demo/excel/export-excel'),
          name: 'ExportExcel',
          meta: { title: '导出表格' }
        },
        {
          path: 'export-selected-excel',
          component: () => import('@/views/demo/excel/select-excel'),
          name: 'SelectExcel',
          meta: { title: '导出已选项' }
        },
        {
          path: 'export-merge-header',
          component: () => import('@/views/demo/excel/merge-header'),
          name: 'MergeHeader',
          meta: { title: '导出多级表头' }
        },
        {
          path: 'upload-excel',
          component: () => import('@/views/demo/excel/upload-excel'),
          name: 'UploadExcel',
          meta: { title: '上传Excel' }
        }
      ]
    },

    {
      path: '/zip',
      component: Demo,
      redirect: '/zip/download',
      alwaysShow: true,
      name: 'Zip',
      meta: { title: 'Zip', icon: 'zip' },
      children: [
        {
          path: 'download',
          component: () => import('@/views/demo/zip/index'),
          name: 'ExportZip',
          meta: { title: 'Export Zip' }
        }
      ]
    },

    {
      path: '/pdf',
      component: Demo,
      redirect: '/pdf/index',
      children: [
        {
          path: 'index',
          component: () => import('@/views/demo/pdf/index'),
          name: 'PDF',
          meta: { title: 'PDF', icon: 'pdf' }
        }
      ]
    },
    {
      path: '/pdf/download',
      component: () => import('@/views/demo/pdf/download'),
      hidden: true
    },

    {
      path: '/theme',
      component: Demo,
      children: [
        {
          path: 'index',
          component: () => import('@/views/demo/theme/index'),
          name: 'Theme',
          meta: { title: '换肤', icon: 'theme' }
        }
      ]
    },

    {
      path: '/clipboard',
      component: Demo,
      children: [
        {
          path: 'index',
          component: () => import('@/views/demo/clipboard/index'),
          name: 'ClipboardDemo',
          meta: { title: 'Clipboard', icon: 'clipboard' }
        }
      ]
    },

    {
      path: 'external-link',
      component: Demo,
      children: [
        {
          path: 'https://zztabc.com',
          meta: { title: 'External Link', icon: 'link' }
        }
      ]
    }
  ]
}
