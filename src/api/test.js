import request from '@/utils/request'

// 添加题目
export function testSubmit(data) {
  return request({
    url: '/test',
    method: 'post',
    data
  })
}

// 获取所有题目
export function getTest() {
  return request({
    url: '/test',
    method: 'get'
  })
}

// 删除题目
export function deleteTest(params) {
  return request({
    url: '/delete',
    method: 'get',
    params
  })
}
