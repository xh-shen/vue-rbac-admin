export const dropdown = (h, vm, scope, options, txt = '更多') => {
  const childNode = options.map(item => h('el-dropdown-item', {
    props: { command: item.command },
    directives: [
      {
        name: 'permission',
        value: item.permission
      }
    ]
  }, item.text))
  const node = h('el-dropdown', {
    style: {
      marginLeft: '10px'
    },
    on: {
      command: (command) => {
        vm.handleCommandChange(command, scope.row)
      }
    }
  }, [
    h('el-link', { props: { type: 'primary', underline: false } }, [txt, h('i', { 'class': 'el-icon-arrow-down el-icon--right' })]),
    h('el-dropdown-menu', { slot: 'dropdown' }, childNode)
  ])
  return node
}

let defaultOptions = {
  placement: 'right',
  width: '400',
  trigger: 'click'
}

export const tablePopover = (h, data = [], columns = [], options = defaultOptions, txt = '查看') => {
  return h('el-popover', {
    props: options
  }, [
    h('base-table', {
      props: {
        data,
        columns,
        hasPage: false,
        tHeight: 300
      }
    }),
    h('el-link', {
      props: {
        type: 'primary',
        underline: false
      },
      slot: 'reference'
    }, txt)
  ])
}
