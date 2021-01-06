import axios from '@/utils/api.request';

export const login = (data, uuid) => {
  return axios.request({
    url: '/admin/v1/signin',
    headers: {
      Uuid: uuid
    },
    data,
    method: 'post'
  });
};

export const logout = () => {
  return axios.request({
    url: '/admin/v1/signout',
    method: 'post'
  });
};

export const getCaptcha = uuid => {
  return axios.request({
    url: '/admin/v1/captcha',
    headers: {
      Uuid: uuid
    },
    method: 'get'
  });
};

export const editPassword = data => {
  return axios.request({
    url: '/admin/v1/user/password/edit',
    data,
    method: 'post'
  });
};

export const editInfo = data => {
  return axios.request({
    url: '/admin/v1/user/info/edit',
    data,
    method: 'post'
  });
};

export const getUserList = params => {
  return axios.request({
    url: '/admin/v1/user',
    params,
    method: 'get'
  });
};

export const getUserInfo = () => {
  return axios.request({
    url: '/admin/v1/user/info',
    method: 'get'
  });
};

export const addUser = data => {
  return axios.request({
    url: '/admin/v1/user',
    data,
    method: 'post'
  });
};

export const updateUser = (id, data) => {
  return axios.request({
    url: `/admin/v1/user/${id}`,
    data,
    method: 'put'
  });
};

export const getUserDetail = id => {
  return axios.request({
    url: `/admin/v1/user/${id}`,
    method: 'get'
  });
};

export const del = id => {
  return axios.request({
    url: `/admin/v1/user/${id}`,
    method: 'delete'
  });
};

export const getAllUser = () => {
  return axios.request({
    url: `/admin/v1/all/user`,
    method: 'get'
  });
};

export const delMult = ids => {
  return axios.request({
    url: `/admin/v1/mult/user/destroy`,
    data: { ids },
    method: 'post'
  });
};

export const resetPwd = id => {
  return axios.request({
    url: `/admin/v1/user/${id}/reset`,
    method: 'get'
  });
};
