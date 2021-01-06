import config from '@/config';

/**
 * @description 根据当前跳转的路由设置显示在浏览器标签的title
 * @param {Object} routeItem 路由对象
 */
export const setTitle = route => {
  const pageTitle = (route.meta && route.meta.title) || route.name;
  const resTitle = pageTitle ? `${pageTitle} - ${config.title}` : config.title;
  window.document.title = resTitle;
};

const sonsTree = (obj, arr) => {
  const children = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].pid === obj.id) {
      sonsTree(arr[i], arr);
      children.push(arr[i]);
    }
  }
  if (children.length > 0) {
    obj.children = children;
  }
  return obj;
};

export const toTree = data => {
  const treeArr = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].pid === 0) {
      const o = sonsTree(data[i], data);
      treeArr.push(o);
    }
  }
  return treeArr;
};

export const toSelectTree = data => {
  const treeArr = [];
  let arr = data.filter(i => i.status === 1);
  arr = arr.map(i => ({
    id: i.id,
    label: i.name,
    pid: i.pid,
    desc: i.description,
    gasPermissionId: i.gasPermissionId
  }));
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].pid === 0) {
      const o = sonsTree(arr[i], arr);
      treeArr.push(o);
    }
  }
  return treeArr;
};

export const arrayGroup = (list, field) => {
  let map = {};
  let dest = [];
  if (list.length === 0) {
    return dest;
  }
  for (let i = 0; i < list.length; i++) {
    var currnent = list[i];
    if (!map[currnent[field]]) {
      dest.push({
        id: currnent.id,
        label: currnent.menuName,
        gasMenuId: currnent.gasMenuId,
        children: [currnent]
      });
      map[currnent[field]] = currnent;
    } else {
      for (let j = 0; j < dest.length; j++) {
        var dj = dest[j];
        if (dj[field] === currnent[field]) {
          dj.children.push(currnent);
          break;
        }
      }
    }
  }
  return dest;
};

export const getPoint = el => {
  if (!el) {
    return 0;
  }
  let top = el.offsetTop;
  /* eslint-disable */
  while ((el = el.offsetParent)) {
    top += el.offsetTop;
  }
  return top;
};

export const randomStr = (len = 32) => {
  const $chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const maxPos = $chars.length;
  let str = '';
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
};

export const lazyComponent = path => () => import(`@/${path}`);
