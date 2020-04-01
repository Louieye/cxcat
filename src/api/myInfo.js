import request from '@/utils/request'

export function getInfo(data) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'post',
    data
  })
}
