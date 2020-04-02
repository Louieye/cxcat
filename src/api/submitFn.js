import request from '@/utils/request'
import store from '@/store'

// 操作云服务器
// 查询
export function getInfo(query) {
  const list = {
    env: 'lyj-app',
    query: query
  }
  console.log('【get请求云数据库】', JSON.stringify(list))
  const access_token = store.getters.access_token
  return request({
    url: 'tcb/databasequery?access_token=' + access_token,
    method: 'post',
    data: JSON.stringify(list)
  })
}

// 添加
export function addInfo(query) {
  const list = {
    env: 'lyj-app',
    query: query
  }
  console.log('【add请求云数据库】', JSON.stringify(list))
  const access_token = store.getters.access_token
  return request({
    url: 'tcb/databaseadd?access_token=' + access_token,
    method: 'post',
    data: JSON.stringify(list)
  })
}

// 更新
export function updateInfo(query) {
  const list = {
    env: 'lyj-app',
    query: query
  }
  console.log('【update请求云数据库】', JSON.stringify(list))
  const access_token = store.getters.access_token
  return request({
    url: 'tcb/databaseupdate?access_token=' + access_token,
    method: 'post',
    data: JSON.stringify(list)
  })
}

// 删除
export function deleteInfo(query) {
  const list = {
    env: 'lyj-app',
    query: query
  }
  console.log('【delete请求云数据库】', JSON.stringify(list))
  const access_token = store.getters.access_token
  return request({
    url: 'tcb/databasedelete?access_token=' + access_token,
    method: 'post',
    data: JSON.stringify(list)
  })
}

