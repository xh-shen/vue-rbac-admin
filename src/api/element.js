import axios from '@/utils/api.request'

export const getList = params => {
  return axios.request({
    url: '/admin/v1/element',
    params,
    method: 'get'
  })
}

export const create = (data) => {
  return axios.request({
    url: '/admin/v1/element',
    data,
    method: 'post'
  })
}

export const update = (id, data) => {
  return axios.request({
    url: `/admin/v1/element/${id}`,
    data,
    method: 'put'
  })
}

export const getDetail = (id) => {
  return axios.request({
    url: `/admin/v1/element/${id}`,
    method: 'get'
  })
}
