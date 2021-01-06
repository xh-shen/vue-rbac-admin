const model = () => ({
  name: '',
  mobile: '',
  contacts: '',
  contactsMobile: '',
  email: '',
  website: '',
  status: 1
});

const schema = vm => {
  return [
    {
      tag: 'input',
      modelKey: 'name',
      label: '公司名称',
      placeholder: '请输入公司名称',
      span: 12,
      rules: [
        { required: true, message: '请输入公司名称', trigger: 'blur' },
        {
          min: 2,
          max: 100,
          message: '公司名称长度在2到100个字符',
          trigger: ['blur']
        }
      ]
    },
    {
      tag: 'input',
      modelKey: 'mobile',
      label: '公司电话',
      placeholder: '请输入公司电话',
      span: 12,
      rules: [
        {
          message: '公司电话格式不正确',
          pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
          trigger: ['blur']
        }
      ]
    },
    {
      tag: 'input',
      modelKey: 'contacts',
      label: '联系人',
      placeholder: '请输入联系人',
      span: 12,
      rules: [
        {
          min: 2,
          max: 10,
          message: '联系人长度在2到10个字符',
          trigger: ['blur']
        }
      ]
    },
    {
      tag: 'input',
      modelKey: 'contactsMobile',
      label: '联系人电话',
      placeholder: '请输入联系人电话',
      span: 12,
      rules: [
        {
          message: '联系人电话格式不正确',
          pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
          trigger: ['blur']
        }
      ]
    },
    {
      tag: 'input',
      modelKey: 'email',
      label: '公司邮箱',
      placeholder: '请输入公司邮箱',
      span: 12,
      rules: [
        {
          type: 'email',
          message: '公司邮箱格式不正确',
          trigger: ['blur']
        }
      ]
    },
    {
      tag: 'input',
      modelKey: 'website',
      label: '公司网址',
      placeholder: '请输入公司网址',
      span: 12,
      rules: [
        {
          type: 'url',
          message: '公司网址格式不正确',
          trigger: ['blur']
        }
      ]
    },
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
