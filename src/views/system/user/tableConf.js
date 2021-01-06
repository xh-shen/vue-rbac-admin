export default vm => {
  return [
    // {
    //   type: 'selection',
    //   width: '55'
    // },
    {
      prop: 'username',
      minWidth: '120',
      label: '用户名'
    },
    {
      attrs: {
        prop: 'name',
        minWidth: '140',
        label: '单位/公司名称',
        'show-overflow-tooltip': true
      },
      render: (h, scope) => vm._v(scope.row.name || scope.row.companyName)
    },
    {
      prop: 'phone',
      minWidth: '140',
      label: '手机号'
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
    // {
    //   prop: 'createdAt',
    //   minWidth: '180',
    //   label: '创建时间'
    // },
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
                  value: 'edit-user'
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
                  value: 'delete-user'
                }
              ]
            },
            '删除'
          ),
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
                  vm.handleResetPwd(scope.row.id);
                }
              },
              directives: [
                {
                  name: 'permission',
                  value: 'reset-pwd'
                }
              ]
            },
            '重置密码'
          )
        ];
        return h('div', {}, childNode);
      }
    }
  ];
};
