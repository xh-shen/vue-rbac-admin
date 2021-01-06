export default vm => {
  return [
    {
      prop: 'name',
      minWidth: '200',
      label: '公司名称',
      'show-overflow-tooltip': true
    },
    {
      prop: 'mobile',
      minWidth: '120',
      label: '公司电话'
    },
    {
      prop: 'contacts',
      minWidth: '100',
      label: '联系人'
    },
    {
      prop: 'contactsMobile',
      minWidth: '120',
      label: '联系人电话'
    },
    {
      prop: 'email',
      minWidth: '120',
      label: '公司邮箱'
    },
    {
      prop: 'website',
      minWidth: '120',
      label: '公司网址'
    },
    {
      prop: 'regionName',
      minWidth: '140',
      label: '所属地区'
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
                  value: 'edit-company'
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
                  value: 'delete-company'
                }
              ]
            },
            '删除'
          )
        ];
        return h('div', {}, childNode);
      }
    }
  ];
};
