import store from '@/store'

export default {
  inserted (el, binding, vnode) {
    const { value } = binding
    const permissionOperations = store.getters && store.getters.permissionOperations
    if (value && typeof (value) === 'string') {
      const hasPermission = permissionOperations.includes(value)

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`权限配置错误！`)
    }
  }
}
