import { users } from './user'

const testData = [{
  id: '1',
  title: 'scratch',
  isActive: true,
  author: '王大虎',
  date: '2020-3-19',
  question: '1+1=?',
  a: '1',
  b: '2',
  c: '3',
  d: '4',
  answer: 'B'
}, {
  id: '2',
  title: 'python',
  isActive: true,
  author: '王大虎',
  date: '2020-3-19',
  question: '1+2=?',
  a: '1',
  b: '2',
  c: '3',
  d: '4',
  answer: 'C'
}, {
  id: '3',
  title: 'C++',
  isActive: true,
  author: '王大虎',
  date: '2020-3-19',
  question: '1+3=?',
  a: '1',
  b: '2',
  c: '3',
  d: '4',
  answer: 'D'
}]

export default [
  {
    // 获取所有题目
    url: '/test',
    type: 'get',
    response: config => {
      const { token } = config.headers

      // mock error
      if (!users[token]) {
        return {
          code: 50008,
          message: '数据异常，请重新登录'
        }
      }

      return {
        code: 20000,
        data: testData
      }
    }
  },
  {
    // 添加题目
    url: '/test',
    type: 'post',
    response: config => {
      const { token } = config.headers

      // mock error
      if (!users[token]) {
        return {
          code: 50008,
          message: '数据异常，请重新登录'
        }
      }
      const data = config.body
      const index = testData.findIndex(item => item.id === data.id)
      if (index === -1) {
        testData.push(data)
        return {
          code: 20000,
          data: '1'
        }
      } else {
        testData[index] = data
        return {
          code: 20000,
          data: '2'
        }
      }
    }
  }, {
    // 删除题目
    url: '/delete',
    type: 'get',
    response: config => {
      const { token } = config.headers

      // mock error
      if (!users[token]) {
        return {
          code: 50008,
          message: '数据异常，请重新登录'
        }
      }
      const id = config.query
      const index = testData.findIndex(item => item.id === id)
      testData.splice(index, 1)
      return {
        code: 20000,
        data: id
      }
    }
  }]
