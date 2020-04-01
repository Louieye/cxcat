import Cookies from 'js-cookie'

const TokenKey = 'cxcat_token'
const timeOut = 'cxcat_timeout'
const access_token = 'cxcat_access_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getAccess_token() {
  return Cookies.get(access_token)
}

export function setAccessToken(token) {
  return Cookies.set(access_token, token)
}

export function getTimeOut() {
  return Cookies.get(timeOut)
}

export function setTimeOut(time) {
  return Cookies.set(timeOut, time)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeAccess() {
  return Cookies.remove(access_token)
}

export function removeTimeOut() {
  return Cookies.remove(timeOut)
}
