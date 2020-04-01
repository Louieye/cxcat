import request from '@/utils/request'
import store from '@/store'

export function getAccessToken() {
  return request({
    url: 'cgi-bin/token?grant_type=client_credential&appid=wx866eb563150cf730&secret=8f5a352c27f025f2f8f48948ee2daf5f',
    method: 'get'
  })
}

export function login(data) {
  const access_token = store.getters.access_token
  if(!access_token){
    store.dispatch('user/getAccessToken').then(()=>{
      console.log('api设置access');
      console.log('api返回');
      return request({
        url: 'tcb/databasequery?access_token=' + access_token,
        method: 'post',
        data
      })
    })
  }else{
    return request({
      url: 'tcb/databasequery?access_token=' + access_token,
      method: 'post',
      data
    })
  }
}

export function getInfo(data) {
  const access_token = store.getters.access_token
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
    url: '/user/getMenu',
    method: 'get'
  })
}
