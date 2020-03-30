import Cookies from 'js-cookie'
import { getAccessToken } from '@/api/user'
import store from '@/store'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function checkAccessToken() {
  const time = Date.parse(new Date())
  getAccessToken().then( res => {
    store.commit('user/SET_ACCESS_TOKEN', res.access_token)
    store.commit('user/SET_TIMEOUT', res.expires_in + time - 300)
  })
  return
}