const steps = [
  {
    element: '#hamburger-container',
    popover: {
      title: '导航按钮',
      description: '打开 或 关闭侧边栏',
      position: 'bottom'
    }
  },
  {
    element: '#breadcrumb-container',
    popover: {
      title: '面包屑导航',
      description: '指示当前页面位置',
      position: 'bottom'
    }
  },
  {
    element: '#header-search',
    popover: {
      title: '页面搜索',
      description: '页面搜索，快速跳转',
      position: 'left'
    }
  },
  {
    element: '#screenfull',
    popover: {
      title: '全屏',
      description: '将页面设置为全屏',
      position: 'left'
    }
  },
  // {
  //   element: '#size-select',
  //   popover: {
  //     title: 'Switch Size',
  //     description: 'Switch the system size',
  //     position: 'left'
  //   }
  // },
  {
    element: '#tags-view-container',
    popover: {
      title: '标签视图',
      description: '您访问过的页面的历史记录',
      position: 'bottom'
    },
    padding: 0
  }
]

export default steps
