import axios from '@/utils/api.request'

export const getPermissionList = params => {
  return axios.request({
    url: '/admin/v1/permission',
    params,
    method: 'get'
  })
}

export const addPermission = (data) => {
  return axios.request({
    url: '/admin/v1/permission',
    data,
    method: 'post'
  })
}

export const updatePermission = (id, data) => {
  return axios.request({
    url: `/admin/v1/permission/${id}`,
    data,
    method: 'put'
  })
}

export const getPermissionDetail = (id) => {
  return axios.request({
    url: `/admin/v1/permission/${id}`,
    method: 'get'
  })
}
