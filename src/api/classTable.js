import request from '@/utils/request'

export function getInfo(data) {
  const access_token = store.getters.access_token
  return request({
    url: 'tcb/databasequery?access_token=' + access_token,
    method: 'post',
    data
  })
}

export function submitClassTable(data){
    return request({
        url: '/classTable/submit',
        method: 'post',
        data
    })
    
}

export function deleteTable(data){
    return request({
        url: '/classTable/delete',
        method: 'post',
        data
    })
    
}