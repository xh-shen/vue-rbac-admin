const model = () => ({
  name: '',
  description: '',
  status: 1
});

const schema = vm => {
  return [
    {
      tag: 'input',
      modelKey: 'name',
      label: '角色名称',
      placeholder: '请输入角色名称',
      rules: [
        { required: true, message: '请输入角色名称', trigger: 'blur' },
        {
          min: 2,
          max: 20,
          message: '角色名称长度在2到20个字符',
          trigger: ['blur', 'change']
        }
      ]
    },
    {
      tag: 'input',
      modelKey: 'description',
      type: 'textarea',
      label: '角色描述',
      placeholder: '请输入角色描述',
      rules: [
        {
          max: 30,
          message: '角色描述最多30个字符',
          trigger: ['blur', 'change']
        }
      ]
    },
    {
      tag: 'select',
      modelKey: 'status',
      label: '状态',
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
