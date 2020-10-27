import store from '@/store'

/**
 * @param {String} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value
    return roles.some(role => {
      return role.authority === permissionRoles
    })
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}
