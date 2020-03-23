import request from '@/utils/request'

export function permissionInfo() {
  return request({
    url: '/permission/info',
    method: 'get'
  })
}

export function submitInfo(data) {
  return request({
    url: '/permission/submit',
    method: 'post',
    data
  })
}

export function submitChange(data) {
  return request({
    url: '/permission/change',
    method: 'post',
    data
  })
}

export function submitDelete(data) {
  return request({
    url: '/permission/delete',
    method: 'post',
    data
  })
}
