export default vm => [
  {
    attrs: {
      prop: 'name',
      minWidth: '160',
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
    attrs: {
      prop: 'menu',
      minWidth: '140',
      label: '所属菜单'
    },
    render: (h, scope) => {
      return vm._v(scope.row.menu.name);
    }
  },
  {
    prop: 'statusName',
    minWidth: '80',
    label: '状态',
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
    minWidth: '180',
    label: '创建时间'
  },
  {
    attrs: {
      prop: 'action',
      width: '100',
      align: 'center',
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
                value: 'edit-element'
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
