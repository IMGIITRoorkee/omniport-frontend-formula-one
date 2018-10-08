/**
 * Determine whether a role exists in the given array
 *
 * @param {array} roles - The array of roles a person has
 * @param {string} role - The role whose existence is being checked
 * @returns {string} The ActiveStatus enum or NOT_ROLE 
 */
export const ifRole = (roles, role) => {
  if (roles === undefined) {
    return 'EMPTY_ROLES_ARRAY'
  }
  let a = roles.filter(x => {
    return x['role'] === role
  })
  if (a.length !== 0) {
    switch (a[0]['activeStatus']) {
      case 'ActiveStatus.IS_ACTIVE':
        return 'IS_ACTIVE'
      case 'ActiveStatus.HAS_BEEN_ACTIVE':
        return 'HAS_BEEN_ACTIVE'
      case 'ActiveStatus.WILL_BE_ACTIVE':
        return 'WILL_BE_ACTIVE'
      default:
        return 'NOT_ROLE'
    }
  } else {
    return 'NOT_ROLE'
  }
}
