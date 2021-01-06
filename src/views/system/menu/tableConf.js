export default vm => [
  {
    attrs: {
      prop: 'name',
      minWidth: '200',
      'show-overflow-tooltip': true,
      label: '名称'
    },
    render: (h, scope) => {
      let childNode = [h('span', {}, scope.row.name)];
      return h('span', {}, childNode);
    }
  },
  {
    prop: 'code',
    minWidth: '120',
    label: '编码'
  },
  {
    prop: 'path',
    minWidth: '140',
    label: '路径'
  },
  {
    attrs: {
      prop: 'isRouter',
      minWidth: '100',
      label: '路由'
    },
    render: (h, scope) =>
      h(
        'el-tag',
        {
          props: {
            effect: 'plain',
            size: 'mini',
            type: scope.row.isRouter === 1 ? 'success' : 'danger'
          }
        },
        scope.row.isRouter === 1 ? '是' : '否'
      )
  },
  {
    prop: 'cmpPath',
    minWidth: '140',
    label: '组件路径'
  },
  {
    attrs: {
      prop: 'hidden',
      minWidth: '100',
      label: '隐藏'
    },
    render: (h, scope) =>
      h(
        'el-tag',
        {
          props: {
            effect: 'plain',
            size: 'mini',
            type: scope.row.hidden === 1 ? 'success' : 'danger'
          }
        },
        scope.row.hidden === 1 ? '是' : '否'
      )
  },
  {
    prop: 'sort',
    minWidth: '80',
    label: '排序'
  },
  {
    attrs: {
      prop: 'icon',
      minWidth: '80',
      label: '图标'
    },
    render: (h, scope) =>
      h('svg-icon', {
        props: {
          'icon-class': scope.row.icon
        },
        style: {
          color: '#999'
        }
      })
  },
  {
    attrs: {
      prop: 'statusName',
      minWidth: '80',
      label: '状态'
    },
    render: (h, scope) =>
      h(
        'el-tag',
        {
          props: {
            effect: 'plain',
            size: 'mini',
            type: scope.row.status === 1 ? 'success' : 'danger'
          }
        },
        scope.row.statusName
      )
  },
  {
    prop: 'createdAt',
    minWidth: '160',
    label: '创建时间'
  },
  {
    attrs: {
      prop: 'action',
      width: '100',
      fixed: vm.mobile ? false : 'right',
      label: '操作'
    },
    render: (h, scope) => {
      let childNode = [
        h(
          'el-button',
          {
            props: {
              type: 'text',
              size: 'small'
            },
            on: {
              click: e => {
                e.stopPropagation();
                vm.handleDataUpdate(scope.row.id);
              }
            },
            directives: [
              {
                name: 'permission',
                value: 'edit-menu'
              }
            ]
          },
          '编辑'
        )
      ];
      return h('div', {}, childNode);
    }
  }
];
