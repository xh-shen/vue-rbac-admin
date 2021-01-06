import axios from '@/utils/api.request';

export const getAllRegion = () => {
  return axios.request({
    url: `/admin/v1/all/region`,
    method: 'get'
  });
};

export const getAllCompany = regionId => {
  return axios.request({
    url: `/admin/v1/all/company`,
    params: { regionId },
    method: 'get'
  });
};
