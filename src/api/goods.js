import request from '@/utils/request'

export function getGoods() {
  return request({
    url: '/goods/info',
    method: 'get'
  })
}

export function submitGoods(data) {
  return request({
    url: '/goods/submit',
    method: 'post',
    data
  })
}
