import request from '@/utils/request'
import store from '@/store'

// 请求云数据库
export function getInfo(query) {
  const list = {
    env: 'lyj-app',
    query: query
  }
  console.log('【请求云数据库】', JSON.stringify(list))
  const access_token = store.getters.access_token
  return request({
    url: 'tcb/databasequery?access_token=' + access_token,
    method: 'post',
    data: JSON.stringify(list)
  })
}

// 请求云数据库
export function submitInfo(query) {
  const list = {
    env: 'lyj-app',
    query: query
  }
  console.log('【submit请求云数据库】', JSON.stringify(list))
  const access_token = store.getters.access_token
  return request({
    url: 'tcb/databasequery?access_token=' + access_token,
    method: 'post',
    data: JSON.stringify(list)
  })
}

