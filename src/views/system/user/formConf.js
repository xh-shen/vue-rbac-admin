const model = () => ({
  username: '',
  name: '',
  gasCompanyId: null,
  gasRegionId: null,
  phone: '',
  status: 1
  // type: 1
});

const schema = vm => {
  return [
    {
      tag: 'input',
      modelKey: 'username',
      label: '用户名',
      disabled: !vm.isCreate,
      placeholder: '请输入用户名',
      span: 12,
      rules: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        {
          message: '用户名只能包含数字和英文',
          pattern: /^[A-Za-z0-9]+$/,
          trigger: ['blur', 'change']
        },
        {
          min: 4,
          max: 20,
          message: '用户名长度在4到20个字符',
          trigger: ['blur', 'change']
        }
      ]
    },
    // {
    //   tag: 'input',
    //   modelKey: 'email',
    //   label: '邮箱',
    //   placeholder: '邮箱必须填写，接收账号密码',
    //   span: 12,
    //   rules: [
    //     { required: true, message: '请输入邮箱', trigger: 'blur' },
    //     {
    //       type: 'email',
    //       message: '请输入正确的邮箱',
    //       trigger: ['blur', 'change']
    //     }
    //   ]
    // },
    {
      tag: 'input',
      modelKey: 'name',
      label: '单位名称',
      placeholder: '请输入单位名称',
      span: 12,
      hidden: vm.userInfo && vm.userInfo.type === 2,
      rules: [
        { required: true, message: '请输入单位名称', trigger: 'blur' },
        {
          min: 2,
          max: 40,
          message: '单位名称长度在2到40个字符',
          trigger: 'blur'
        }
      ]
    },
    {
      tag: 'select',
      modelKey: 'gasCompanyId',
      label: '公司',
      placeholder: '请选择公司',
      span: 12,
      attrs: {
        filterable: true
      },
      hidden: vm.userInfo && vm.userInfo.type !== 2,
      options: vm.companyList,
      rules: [{ required: true, message: '请选择公司', trigger: 'change' }]
    },
    {
      tag: 'select',
      modelKey: 'gasRegionId',
      label: '地区',
      placeholder: '请选择地区',
      span: 12,
      attrs: {
        filterable: true
      },
      hidden: vm.userInfo && vm.userInfo.type !== 1,
      options: vm.regionList,
      rules: [{ required: true, message: '请选择地区', trigger: 'change' }]
    },
    {
      tag: 'input',
      modelKey: 'phone',
      label: '手机号',
      placeholder: '请输入手机号',
      span: 12,
      rules: [
        {
          message: '手机号格式不正确',
          pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
          trigger: ['blur', 'change']
        }
      ]
    },
    // {
    //   tag: 'select',
    //   modelKey: 'type',
    //   label: '用户类型',
    //   placeholder: '请选择用户类型',
    //   span: 12,
    //   disabled: true,
    //   options: [
    //     { label: '省级管理员', value: 1 },
    //     { label: '市级管理员', value: 2 },
    //     { label: '公司管理员', value: 3 }
    //   ],
    //   rules: [{ required: true, message: '请选择用户类型', trigger: 'change' }]
    // },
    {
      tag: 'select',
      modelKey: 'status',
      label: '状态',
      span: 12,
      options: [{ value: 1, label: '启用' }, { value: 0, label: '停用' }]
    }
  ];
};

export default vm => {
  return {
    model: model(vm),
    schema: schema(vm)
  };
};
