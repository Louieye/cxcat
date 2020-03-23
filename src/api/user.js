import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getMenu() {
  return request({
    url: '/vue-admin-template/user/getMenu',
    method: 'get'
  })
}
