/*
 * @Author: shen
 * @Date: 2019-10-16 16:48:21
 * @LastEditors: shen
 * @LastEditTime: 2021-01-06 09:41:04
 * @Description:
 */
const baseUrl =
  process.env.VUE_APP_ENV === 'development'
    ? ''
    : process.env.VUE_APP_ENV === 'test'
      ? ''
      : '';

export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'RBAC权限管理系统',
  /**
   * @description api请求基础路径
   */
  baseUrl,

  fixedHeader: false,

  sidebarLogo: true
};
