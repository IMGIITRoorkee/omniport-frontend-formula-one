import configs from 'core/configs.json'

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

/**
 * Returns cookie corresponding to key
 *
 * @param {string} cname - The key corresponding to which cookie is required
 * @returns {string} The cookie key's value or empty string
 */
export const getCookie = cname => {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

/**
 * It's cool 😎
 */
export const consoleIMG = () => {
  const logo =
    '\n' +
    '█████████████████████████████████████████████\n' +
    '█████████████████████████████████████████████\n' +
    '█████████████████████████████████████████████\n' +
    '█████████████████████████████████████████████\n' +
    '█████████████████████████████████████████████\n' +
    '█████████         █████████         █████████\n' +
    '█████████         █████████         █████████\n' +
    '█████████         █████████         █████████\n' +
    '█████████         █████████         █████████\n' +
    '█████████         █████████         █████████\n' +
    '█████████         ███████████████████████████\n' +
    '█████████         ███████████████████████████\n' +
    '█████████         ███████████████████████████\n' +
    '█████████         ███████████████████████████\n' +
    '█████████         ███████████████████████████\n' +
    '                                    █████████\n' +
    '                                    █████████\n' +
    '                                    █████████\n' +
    '                                    █████████\n' +
    '                                    █████████\n' +
    '█████████         ███████████████████████████\n' +
    '█████████         ███████████████████████████\n' +
    '█████████         ███████████████████████████\n' +
    '█████████         ███████████████████████████\n' +
    '█████████         ███████████████████████████'
  console.log(`%c${logo}`, 'border-left: 4px solid #0D68AF; padding-left: 8px;')
  console.log(
    '%cMade with ❤️ by IMG',
    'border-left: 4px solid #379FFF; padding-left: 8px; font-family: "Arial"; font-size: 16px;'
  )
}

/**
 * To return app details from frontend
 *
 * @param {string} [appName] - The name of app corresponding to which details are required
 * @returns {object} The object containing if app or service exist and its details
 */
export const appDetails = appName => {
  let details
  let present = false
  let service = configs.services.filter(
    service => service.nomenclature.name === appName
  )
  let app = configs.apps.filter(app => app.nomenclature.name === appName)
  if (service.length === 0 && app.length === 0) {
    present = false
  } else {
    present = true
    details = app || service
  }
  return {
    present: present,
    details: details[0]
  }
}
