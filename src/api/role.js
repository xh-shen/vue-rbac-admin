import axios from '@/utils/api.request';

export const getRoleList = params => {
  return axios.request({
    url: '/admin/v1/role',
    params,
    method: 'get'
  });
};

export const addRole = data => {
  return axios.request({
    url: '/admin/v1/role',
    data,
    method: 'post'
  });
};

export const updateRole = (id, data) => {
  return axios.request({
    url: `/admin/v1/role/${id}`,
    data,
    method: 'put'
  });
};

export const getRoleDetail = id => {
  return axios.request({
    url: `/admin/v1/role/${id}`,
    method: 'get'
  });
};

export const getAllRole = () => {
  return axios.request({
    url: `/admin/v1/all/role`,
    method: 'get'
  });
};

export const setUser = (id, data) => {
  return axios.request({
    url: `/admin/v1/role/${id}/user/set`,
    data,
    method: 'post'
  });
};

export const getPermission = id => {
  return axios.request({
    url: `/admin/v1/role/${id}/permission/get`,
    method: 'get'
  });
};

export const setPermission = (id, data) => {
  return axios.request({
    url: `/admin/v1/role/${id}/permission/set`,
    data,
    method: 'post'
  });
};

export const del = id => {
  return axios.request({
    url: `/admin/v1/role/${id}`,
    method: 'delete'
  });
};
