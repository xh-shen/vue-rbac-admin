const model = () => ({
  name: '',
  pid: 0,
  code: '',
  path: '/',
  cmpPath: '',
  sort: 1,
  icon: 'dashboard',
  description: '',
  activeMenu: '',
  hidden: false,
  isRouter: 0,
  isSuper: 0,
  status: 1
});

const schema = vm => {
  return [
    {
      tag: 'input',
      modelKey: 'name',
      label: '名称',
      placeholder: '请输入菜单名称',
      span: 12,
      rules: [
        { required: true, message: '请输入菜单名称', trigger: 'blur' },
        {
          min: 2,
          max: 10,
          message: '菜单名称长度在2到10个字符',
          trigger: ['blur', 'change']
        }
      ]
    },
    {
      tag: 'input',
      modelKey: 'code',
      label: '编码',
      placeholder: '请输入菜单编码',
      span: 12,
      rules: [
        { required: true, message: '请输入菜单编码', trigger: 'blur' },
        {
          message: '菜单编码只能英文开头，包含英文数字中划线',
          pattern: /^[a-z][a-z0-9A-Z-]+[a-z0-9A-Z]$/,
          trigger: ['blur', 'change']
        },
        {
          min: 2,
          max: 20,
          message: '菜单编码长度在2到20个字符',
          trigger: ['blur', 'change']
        }
      ]
    },
    {
      tag: 'select-tree',
      modelKey: 'pid',
      label: '父级',
      placeholder: '请选择父级菜单',
      span: 12,
      defaultProps: {
        parent: 'pid',
        value: 'id',
        label: 'label',
        children: 'children'
      },
      options: [
        {
          label: '顶级',
          id: 0,
          pid: 0,
          children: [...vm.treeList]
        }
      ]
    },
    {
      tag: 'input',
      modelKey: 'path',
      label: '路径',
      placeholder: '/system',
      span: 12
    },
    {
      tag: 'select',
      modelKey: 'isRouter',
      label: '路由',
      options: [{ value: 1, label: '是' }, { value: 0, label: '否' }],
      span: 12
    },
    {
      tag: 'input',
      modelKey: 'cmpPath',
      label: '组件路径',
      placeholder: 'views/dashboard',
      span: 12
    },
    {
      tag: 'input',
      modelKey: 'activeMenu',
      label: '高亮',
      placeholder: '请输入高亮菜单',
      span: 12
    },
    {
      tag: 'switch',
      modelKey: 'hidden',
      label: '隐藏',
      span: 12
    },
    {
      tag: 'number',
      modelKey: 'sort',
      label: '排序',
      placeholder: '请输入排序',
      span: 12,
      rules: [
        { required: true, message: '请输入排序' },
        { type: 'number', message: '排序必须为数字' }
      ]
    },
    {
      tag: 'input',
      modelKey: 'icon',
      label: '图标',
      placeholder: '请输入图标',
      span: 12
    },
    {
      tag: 'select',
      modelKey: 'isSuper',
      label: '超级权限',
      options: [{ value: 1, label: '是' }, { value: 0, label: '否' }],
      span: 12
    },
    {
      tag: 'select',
      modelKey: 'status',
      label: '状态',
      options: [{ value: 1, label: '启用' }, { value: 0, label: '停用' }],
      span: 12
    },
    {
      tag: 'input',
      modelKey: 'description',
      label: '描述',
      attrs: {
        maxlength: '20',
        'show-word-limit': true
      },
      placeholder: '请输入菜单描述',
      span: 24
    }
  ];
};

export default vm => {
  return {
    model: model(vm),
    schema: schema(vm)
  };
};
