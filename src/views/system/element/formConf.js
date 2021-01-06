const model = () => ({
  name: '',
  gasMenuId: null,
  code: '',
  description: '',
  status: 1
});

const schema = vm => {
  return [
    {
      tag: 'input',
      modelKey: 'name',
      label: '名称',
      placeholder: '请输入元素名称',
      span: 12,
      rules: [
        { required: true, message: '请输入元素名称', trigger: 'blur' },
        {
          min: 2,
          max: 10,
          message: '元素名称长度在2到10个字符',
          trigger: ['blur', 'change']
        }
      ]
    },
    {
      tag: 'input',
      modelKey: 'code',
      label: '编码',
      placeholder: '请输入元素编码',
      span: 12,
      rules: [
        { required: true, message: '请输入元素编码', trigger: 'blur' },
        {
          message: '元素编码只能英文开头，包含英文数字中划线',
          pattern: /^[a-z][a-z0-9A-Z-]+[a-z0-9A-Z]$/,
          trigger: ['blur', 'change']
        },
        {
          min: 2,
          max: 40,
          message: '元素编码长度在2到40个字符',
          trigger: ['blur', 'change']
        }
      ]
    },
    {
      tag: 'select-tree',
      modelKey: 'gasMenuId',
      label: '所属菜单',
      placeholder: '请选择所属菜单',
      span: 12,
      defaultProps: {
        parent: 'pid',
        value: 'id',
        label: 'label',
        children: 'children'
      },
      listeners: {
        select: vm.handleMenuSelect
      },
      options: [...vm.treeList],
      rules: [{ required: true, message: '请选择所属菜单', trigger: 'change' }]
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
      placeholder: '请输入元素描述',
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
