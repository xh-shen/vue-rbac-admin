export default vm => {
  return [
    {
      prop: 'companyName',
      minWidth: '160',
      label: '单位名称',
      'show-overflow-tooltip': true
    },
    {
      prop: 'name',
      minWidth: '100',
      label: '姓名'
    },
    {
      prop: 'sexName',
      minWidth: '60',
      label: '性别'
    },
    {
      prop: 'cardNo',
      minWidth: '145',
      label: '身份证号'
    },
    {
      prop: 'mobile',
      minWidth: '120',
      label: '手机号'
    },
    {
      prop: 'photo',
      minWidth: '70',
      label: '工作照',
      render: (h, scope) => {
        const url = scope.row.photo || scope.row.photoUrl;
        return url
          ? h('img', {
            attrs: {
              src: `${url}?x-image-process=image/resize,m_lfit,h_50`
            },
            style: {
              height: '50px',
              cursor: 'pointer'
            },
            on: {
              click: e => {
                e.stopPropagation();
                vm.handlePhotoView(scope.row.name, url);
              }
            }
          })
          : vm._v('暂无');
      }
    },
    {
      prop: 'jobNumber',
      minWidth: '80',
      label: '工号'
    },
    {
      prop: 'job',
      minWidth: '100',
      label: '职务'
    },
    {
      prop: 'jurisdiction',
      minWidth: '120',
      label: '负责辖区'
    },
    {
      prop: 'regionName',
      minWidth: '120',
      label: '所属地区'
    },

    {
      prop: 'statusName',
      minWidth: '90',
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
        width: '100px',
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
                  value: 'edit-staff'
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
                  value: 'delete-staff'
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
