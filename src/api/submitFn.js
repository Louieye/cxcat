import request from '@/utils/request'
import store from '@/store'

//查询
export function getInfo(data) {
  const access_token = store.getters.access_token
  return request({
    url: 'tcb/databasequery?access_token=' + access_token,
    method: 'post',
    data
  })
}

//插入
export function addInfo(data) {
  const access_token = store.getters.access_token
  return request({
    url: 'tcb/databaseadd?access_token=' + access_token,
    method: 'post',
    data
  })
}

//删除
export function deleteInfo(data) {
    const access_token = store.getters.access_token
    return request({
      url: 'tcb/databasedelete?access_token=' + access_token,
      method: 'post',
      data
    })
}

//更新
export function updateInfo(data) {
    const access_token = store.getters.access_token
    return request({
      url: 'tcb/databaseupdate?access_token=' + access_token,
      method: 'post',
      data
    })
}