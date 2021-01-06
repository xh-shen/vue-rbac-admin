import axios from '@/utils/api.request';

export const getList = params => {
  return axios.request({
    url: '/admin/v1/company',
    params,
    method: 'get'
  });
};

export const create = data => {
  return axios.request({
    url: '/admin/v1/company',
    data,
    method: 'post'
  });
};

export const update = (id, data) => {
  return axios.request({
    url: `/admin/v1/company/${id}`,
    data,
    method: 'put'
  });
};

export const del = id => {
  return axios.request({
    url: `/admin/v1/company/${id}`,
    method: 'delete'
  });
};

export const getDetail = id => {
  return axios.request({
    url: `/admin/v1/company/${id}`,
    method: 'get'
  });
};

export const editInfo = data => {
  return axios.request({
    url: '/admin/v1/company/info/edit',
    data,
    method: 'post'
  });
};
