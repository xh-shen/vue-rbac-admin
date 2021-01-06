// import asyncRoutesMap from '@/router/asyncRoutesMap'
// import { lazyComponent } from '@/utils/common'

const sonsTree = (obj, arr) => {
  const children = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].pid === obj.id) {
      sonsTree(arr[i], arr);
      children.push(arr[i]);
    }
  }
  obj.children = children;
  return obj;
};

const toTree = data => {
  const treeArr = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].pid === 0) {
      const o = sonsTree(data[i], data);
      treeArr.push(o);
    }
  }
  return treeArr;
};

const toMenus = menus =>
  menus.map(item => ({
    name: item.name,
    code: item.code,
    icon: item.icon,
    path: item.path,
    hidden: !!item.hidden,
    pid: item.pid,
    id: item.id
  }));

const toRoutes = menus => {
  let parentRoute = [
    {
      path: '/',
      component: () => import('@/layout'),
      children: []
    }
  ];
  let childRoutes = menus
    .filter(menu => menu.isRouter)
    .map(item => {
      let path = item.path.slice(1);
      return {
        path,
        component: () => import(`@/${item.cmpPath}`),
        // component: lazyComponent(item.cmpPath),
        name: item.code,
        meta: {
          title: item.name,
          activeMenu: item.activeMenu
        }
      };
    });
  parentRoute[0].children = childRoutes;
  return parentRoute;
};

const baseRoute = { path: '*', redirect: '/404', hidden: true };
const commonMenus = {
  name: '首页',
  icon: 'dashboard',
  hidden: false,
  path: '/dashboard'
};

const state = {
  menus: [],
  addRoutes: [],
  operations: [],
  sourceMenus: []
};

const mutations = {
  SET_MENUS: (state, menus) => {
    state.menus = menus;
  },
  SET_OPERATIONS: (state, operations) => {
    state.operations = operations;
  },
  SET_SOURCE_MENUS: (state, menus) => {
    state.sourceMenus = menus;
  }
};

const actions = {
  generateRoutes ({ commit }, menus) {
    return new Promise(resolve => {
      commit('SET_SOURCE_MENUS', menus);
      const accessedMenus = toTree(toMenus(menus));
      accessedMenus.unshift(commonMenus);
      commit('SET_MENUS', accessedMenus);
      const accessedRoutes = toRoutes(menus);
      accessedRoutes.push(baseRoute);
      resolve(accessedRoutes);
    });
  },
  generateOperations ({ commit }, operations) {
    return commit('SET_OPERATIONS', operations);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
