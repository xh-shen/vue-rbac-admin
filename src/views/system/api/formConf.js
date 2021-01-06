const model = () => ({
  name: '',
  gasMenuId: null,
  path: '',
  method: '',
  description: '',
  status: 1
});

const schema = vm => {
  return [
    {
      tag: 'input',
      modelKey: 'name',
      label: '名称',
      placeholder: '请输入接口名称',
      span: 12,
      rules: [
        { required: true, message: '请输入接口名称', trigger: 'blur' },
        {
          min: 2,
          max: 10,
          message: '接口名称长度在2到10个字符',
          trigger: ['blur', 'change']
        }
      ]
    },
    {
      tag: 'input',
      modelKey: 'path',
      label: '路径',
      placeholder: '请输入接口路径',
      span: 12,
      rules: [
        { required: true, message: '请输入接口路径', trigger: 'blur' },
        /* eslint-disable */
        {
          message: '接口路径只能“/”开头，包含英文数字中划线”/“',
          pattern: /^(\/{1})[a-z0-9A-Z-:\/\*]+$/,
          trigger: ['blur', 'change']
        },
        {
          max: 60,
          message: '接口路径最多60个字符',
          trigger: ['blur', 'change']
        }
      ]
    },
    {
      tag: 'select',
      modelKey: 'method',
      label: '方法',
      placeholder: '请选择接口方法',
      span: 12,
      options: [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'DELETE', label: 'DELETE' },
        { value: 'PUT', label: 'PUT' },
        { value: 'HEAD', label: 'HEAD' },
        { value: 'PATCH', label: 'PATCH' }
      ],
      rules: [{ required: true, message: '请选择接口方法', trigger: 'change' }]
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
      options: [...vm.treeList]
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
      placeholder: '请输入描述',
      span: 12
    }
  ];
};

export default vm => {
  return {
    model: model(vm),
    schema: schema(vm)
  };
};
