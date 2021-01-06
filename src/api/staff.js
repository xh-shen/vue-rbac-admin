import axios from '@/utils/api.request';

export const getList = params => {
  return axios.request({
    url: '/admin/v1/staff',
    params,
    method: 'get'
  });
};

export const create = data => {
  return axios.request({
    url: '/admin/v1/staff',
    data,
    method: 'post'
  });
};

export const update = (id, data) => {
  return axios.request({
    url: `/admin/v1/staff/${id}`,
    data,
    method: 'put'
  });
};

export const del = id => {
  return axios.request({
    url: `/admin/v1/staff/${id}`,
    method: 'delete'
  });
};

export const getDetail = id => {
  return axios.request({
    url: `/admin/v1/staff/${id}`,
    method: 'get'
  });
};

export const exportStaff = params => {
  return axios.request({
    url: '/admin/v1/export/staff',
    params,
    method: 'get'
  });
};
