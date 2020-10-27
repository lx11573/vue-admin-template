/** When your routing table is too long, you can split it into small modules **/

import Demo from '@/views/demo/demo'

const componentsRouter = {
  path: '/components',
  component: Demo,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: '组件',
    icon: 'component'
  },
  children: [
    {
      path: 'tinymce',
      component: () => import('@/views/demo/components-demo/tinymce'),
      name: 'TinymceDemo',
      meta: { title: '富文本编辑器' }
    },
    {
      path: 'markdown',
      component: () => import('@/views/demo/components-demo/markdown'),
      name: 'MarkdownDemo',
      meta: { title: 'Markdown' }
    },
    {
      path: 'json-editor',
      component: () => import('@/views/demo/components-demo/json-editor'),
      name: 'JsonEditorDemo',
      meta: { title: 'JSON 编辑器' }
    },
    {
      path: 'split-pane',
      component: () => import('@/views/demo/components-demo/split-pane'),
      name: 'SplitpaneDemo',
      meta: { title: 'SplitPane' }
    },
    {
      path: 'avatar-upload',
      component: () => import('@/views/demo/components-demo/avatar-upload'),
      name: 'AvatarUploadDemo',
      meta: { title: '头像上传' }
    },
    {
      path: 'dropzone',
      component: () => import('@/views/demo/components-demo/dropzone'),
      name: 'DropzoneDemo',
      meta: { title: 'Dropzone' }
    },
    {
      path: 'sticky',
      component: () => import('@/views/demo/components-demo/sticky'),
      name: 'StickyDemo',
      meta: { title: 'Sticky' }
    },
    {
      path: 'count-to',
      component: () => import('@/views/demo/components-demo/count-to'),
      name: 'CountToDemo',
      meta: { title: 'Count To' }
    },
    {
      path: 'mixin',
      component: () => import('@/views/demo/components-demo/mixin'),
      name: 'ComponentMixinDemo',
      meta: { title: '小组件' }
    },
    {
      path: 'back-to-top',
      component: () => import('@/views/demo/components-demo/back-to-top'),
      name: 'BackToTopDemo',
      meta: { title: '返回顶部' }
    },
    {
      path: 'drag-dialog',
      component: () => import('@/views/demo/components-demo/drag-dialog'),
      name: 'DragDialogDemo',
      meta: { title: '拖拽 Dialog' }
    },
    {
      path: 'drag-select',
      component: () => import('@/views/demo/components-demo/drag-select'),
      name: 'DragSelectDemo',
      meta: { title: '拖拽 Select' }
    },
    {
      path: 'dnd-list',
      component: () => import('@/views/demo/components-demo/dnd-list'),
      name: 'DndListDemo',
      meta: { title: '拖拽列表' }
    },
    {
      path: 'drag-kanban',
      component: () => import('@/views/demo/components-demo/drag-kanban'),
      name: 'DragKanbanDemo',
      meta: { title: '可拖拽看板' }
    }
  ]
}

export default componentsRouter
