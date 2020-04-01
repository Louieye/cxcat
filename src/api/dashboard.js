import request from '@/utils/request'
import store from '@/store'

export function getTableData(data){
    const access_token = store.getters.access_token
    return request({
      url: 'tcb/databasequery?access_token=' + access_token,
      method: 'post',
      data
    })
}
