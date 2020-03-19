import {users} from './user'

const replyData = [{
    id: 1,
    date: '2020-03-19',
    course: 'scratch',
    teacher: 'zzz',
    updateDate: '2020-3-19',
    desc: 'aaadsdadadsadasdsadsadassadsad',
    tag: '已反馈'
  }, {
    id: 2,
    date: '2019-05-02',
    course: 'scratch',
    teacher: 'aaa',
    updateDate: '2019-5-10',
    desc: 'aaadsdadadsadasdsadsadassadsad',
    tag: '已反馈'
  }, {
    id: 3,
    date: '2020-03-18',
    course: 'scratch',
    teacher: '王小虎',
    updateDate: '',
    desc: 'aaadsdadadsadasdsadsadassadsad',
    tag: '已反馈'
  }, {
    id: 4,
    date: '2018-05-02',
    course: 'scratch',
    teacher: '王大虎',
    updateDate: '',
    desc: 'aaadsdadadsadasdsadsadassadsad',
    tag: '已反馈'
  }, {
    id: 5,
    date: '2018-07-02',
    course: 'scratch',
    teacher: '王二虎',
    updateDate: '',
    desc: 'aaadsdadadsadasdsadsadassadsad',
    tag: '未反馈'
  }, {
    id: 6,
    date: '2019-05-02',
    course: 'scratch',
    teacher: '王三虎',
    updateDate: '',
    desc: 'aaadsdadadsadasdsadsadassadsad',
    tag: '未反馈'
  }]

export default [
  {
      url: '/reply',
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
          data: replyData
        }
      }
    },

    {
        url: '/reply/submit',
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
          const index = replyData.findIndex( item => item.id == data.id )
          if(data.flag && data.flag == 1) {
              replyData.splice(index,1)
            return {
                code: 20000,
                data: replyData
            }
          }
          replyData[index] = data

          return {
            code: 20000,
            data: replyData
          }
        }
      }
]