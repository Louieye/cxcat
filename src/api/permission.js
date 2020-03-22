import request from '@/utils/request'

export function permissionInfo() {
  return request({
    url: '/permission/info',
    method: 'get'
  })
}
