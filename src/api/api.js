import axios from '@/utils/api.request';

export const getList = params => {
  return axios.request({
    url: '/admin/v1/api',
    params,
    method: 'get'
  });
};

export const create = data => {
  return axios.request({
    url: '/admin/v1/api',
    data,
    method: 'post'
  });
};

export const update = (id, data) => {
  return axios.request({
    url: `/admin/v1/api/${id}`,
    data,
    method: 'put'
  });
};

export const del = id => {
  return axios.request({
    url: `/admin/v1/api/${id}`,
    method: 'delete'
  });
};

export const getDetail = id => {
  return axios.request({
    url: `/admin/v1/api/${id}`,
    method: 'get'
  });
};
