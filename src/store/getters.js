const getters = {
  menus: state => state.permission.menus,
  sourceMenus: state => state.permission.sourceMenus,
  permissionOperations: state => state.permission.operations,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  companyInfo: state => state.user.companyInfo,
  showEditPwd: state => state.user.showEditPwd,
  isGetPermission: state => state.user.isGetPermission,
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device
};
export default getters;
