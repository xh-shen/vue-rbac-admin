const model = () => ({
  name: '',
  mobile: '',
  cardNo: '',
  jobNumber: '',
  job: '',
  jurisdiction: '',
  photo: '',
  sex: 1,
  status: 1
});

const schema = vm => {
  return [
    {
      tag: 'input',
      modelKey: 'name',
      label: '姓名',
      placeholder: '请输入姓名',
      span: 12,
      rules: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        {
          min: 2,
          max: 10,
          message: '姓名长度在2到10个字符',
          trigger: ['blur']
        }
      ]
    },
    {
      tag: 'radio-group',
      modelKey: 'sex',
      label: '性别',
      span: 12,
      options: [{ label: 1, value: '男' }, { label: 2, value: '女' }],
      rules: [{ required: true, message: '请选择性别', trigger: 'change' }]
    },
    // {
    //   tag: 'select',
    //   modelKey: 'sex',
    //   label: '性别',
    //   span: 12,
    //   options: [{ value: 1, label: '男' }, { value: 2, label: '女' }],
    //   rules: [{ required: true, message: '请选择性别', trigger: 'change' }]
    // },
    {
      tag: 'input',
      modelKey: 'cardNo',
      label: '身份证号',
      placeholder: '请输入身份证号',
      span: 12,
      rules: [
        { required: true, message: '请输入身份证号', trigger: 'blur' },
        {
          message: '身份证号格式不正确',
          pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
          trigger: ['blur']
        }
      ]
    },
    {
      tag: 'input',
      modelKey: 'mobile',
      label: '手机号',
      placeholder: '请输入手机号',
      span: 12,
      rules: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        {
          message: '手机号格式不正确',
          pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
          trigger: ['blur']
        }
      ]
    },
    {
      tag: 'input',
      modelKey: 'jobNumber',
      label: '工号',
      placeholder: '请输入工号',
      span: 12
    },
    {
      tag: 'input',
      modelKey: 'job',
      label: '职务',
      placeholder: '请输入职务',
      span: 12
    },
    {
      tag: 'input',
      modelKey: 'jurisdiction',
      label: '负责辖区',
      placeholder: '请输入负责辖区',
      span: 12
    },
    {
      tag: 'select',
      modelKey: 'status',
      label: '状态',
      span: 12,
      options: [{ value: 1, label: '启用' }, { value: 0, label: '停用' }]
    },
    {
      tag: 'uploadImg',
      modelKey: 'photo',
      label: '工作照',
      span: 12,
      rules: [
        { required: true, message: '请输入上传员工工作照', trigger: 'change' }
      ]
    }
  ];
};
export default vm => {
  return {
    model: model(vm),
    schema: schema(vm)
  };
};
