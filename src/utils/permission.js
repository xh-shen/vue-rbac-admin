import store from '@/store';

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission (value) {
  if (value && typeof value === 'string') {
    const permissionOperations =
      store.getters && store.getters.permissionOperations;

    const hasPermission = permissionOperations.includes(value);

    if (!hasPermission) {
      return false;
    }
    return true;
  } else {
    return true;
  }
}
