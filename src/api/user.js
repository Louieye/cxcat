import request from '@/utils/request'
import store from '@/store'
//获取accesstoken接口
// const accessURL = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx866eb563150cf730&secret=8f5a352c27f025f2f8f48948ee2daf5f'
// const queryURL = 'https://api.weixin.qq.com/tcb/databasequery?access_token=ACCESS_TOKEN'
//获取access_token
export function getAccessToken() {
  return request({
    url: 'cgi-bin/token?grant_type=client_credential&appid=wx866eb563150cf730&secret=8f5a352c27f025f2f8f48948ee2daf5f',
    method: 'get'
  })
}

export function login(data) {
  const access_token = store.getters.access_token
  return request({
    url: 'tcb/databasequery?access_token=' + access_token,
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: 'tcb/databasequery?access_token=' + access_token,
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
