import { dropdown } from '@/render';
export default vm => [
  // {
  //   type: 'selection',
  //   width: '55'
  // },
  {
    prop: 'name',
    minWidth: '140',
    label: '名称'
  },
  {
    prop: 'description',
    minWidth: '240',
    label: '描述'
  },
  {
    prop: 'statusName',
    minWidth: '120',
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
      width: '160px',
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
                value: 'edit-role'
              }
            ]
          },
          '编辑'
        ),
        h(
          'el-button',
          {
            props: {
              type: 'text',
              size: 'small'
            },
            style: {
              color: '#f56c6c'
            },
            on: {
              click: e => {
                e.stopPropagation();
                vm.handleDataDelete(scope.row.id);
              }
            },
            directives: [
              {
                name: 'permission',
                value: 'delete-role'
              }
            ]
          },
          '删除'
        ),
        dropdown(h, vm, scope, [
          {
            command: 'permission',
            text: '角色授权',
            permission: 'role-permission'
          },
          { command: 'user', text: '关联用户', permission: 'role-user' }
        ])
      ];
      return h('div', {}, childNode);
    }
  }
];
