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
 * To create a toast message
 *
 * @param {string} [type='info'] - The type of toast enums: {'info', 'success', 'error', 'warning'}
 * @param {string(can also contain HTML)} [header='Information'] - The toast message
 * @param {string(can also contain HTML)} [content='info'] - The toast message
 * @param {number} [timer=3000] - The time for which toast is to display in ms
 */
export const toaster = (type, header, content, timer) => {
  type = type || 'info'
  content = content || type
  timer = timer || 3000
  let a = document.getElementById('toast-container-toastable')
  let message_type = 'info'
  let icon = 'info'

  switch (type) {
    case 'info':
      header = header || 'Information'
      break
    case 'success':
      message_type = 'positive'
      icon = 'check'
      header = header || 'Success'
      break
    case 'error':
      message_type = 'negative'
      icon = 'warning'
      header = header || 'Error'
      break
    case 'warning':
      message_type = 'warning'
      icon = 'warning'
      header = header || 'Warning'
    default:
      header = header || 'Information'
      console.warn('Typo in type parameter in function toaster')
  }
  a
    ? (a.innerHTML =
        `<div style="padding-left: 8px" class="ui compact ${message_type} message icon">` +
        `<i class="${icon} large icon" style="transform:scale(0.5);margin-right:7px;"></i>` +
        `<div class='content'>` +
        `<div class='header'>${header}</div>` +
        `${content}` +
        `</div>`)
    : false
  setTimeout(function () {
    a.innerHTML = ''
  }, timer)
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
