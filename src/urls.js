export function urlSiteBranding () {
  return '/bootstrap/site_branding/'
}

export function urlInstituteBranding () {
  return '/bootstrap/institute_branding/'
}

export function urlMaintainersBranding () {
  return '/bootstrap/maintainers_branding/'
}

export function urlAppBranding (app_name) {
  return `/bootstrap/app/${app_name}`
}
export function urlWhoAmI () {
  return '/kernel/who_am_i/'
}

export function urlGetMaintainers () {
  return '/kernel/maintainers/'
}

export function urlRedirectLogin () {
  return '/rest/login'
}

export function urlRights (which) {
  return `/kernel/rights/?which=${which}`
}

export function urlRoulette () {
  return '/api/gif/roulette'
}

export function urlGif (name) {
  return `/static/gif/${name}.gif`
}
