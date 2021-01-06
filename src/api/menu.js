import axios from '@/utils/api.request';

export const getList = params => {
  return axios.request({
    url: '/admin/v1/menu',
    params,
    method: 'get'
  });
};

export const addMenu = data => {
  return axios.request({
    url: '/admin/v1/menu',
    data,
    method: 'post'
  });
};

export const updateMenu = (id, data) => {
  return axios.request({
    url: `/admin/v1/menu/${id}`,
    data,
    method: 'put'
  });
};

export const getMenuDetail = id => {
  return axios.request({
    url: `/admin/v1/menu/${id}`,
    method: 'get'
  });
};

export const del = id => {
  return axios.request({
    url: `/admin/v1/menu/${id}`,
    method: 'delete'
  });
};
