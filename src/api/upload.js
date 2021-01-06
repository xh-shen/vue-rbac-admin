import axios from '@/utils/api.request';

export const uploadPicture = () => {
  return axios.request({
    url: `/admin/v1/upload/picture`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post'
  });
};

export const uploadMultiple = () => {
  return axios.request({
    url: `/admin/v1/upload/multiple`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post'
  });
};

export const uploadExcelImport = () => {
  return axios.request({
    url: `/admin/v1/upload/excel/import/company`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post'
  });
};

export const uploadExcelImportStaff = () => {
  return axios.request({
    url: `/admin/v1/upload/excel/import/staff`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post'
  });
};
