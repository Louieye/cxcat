import { users } from './user'

const classTable = [{
    id: '1',
    name: 'Mind+',
    type: 'scratch',
    teacher: '赵铁柱',
    startDate: '2020-3-24',
    endDate: '2020-4-24',
    time: '8:00',
    classroom: '教室1',
    day: '2'
},{
    id: '2',
    name: 'Mind++',
    type: 'scratch',
    teacher: '张大虎',
    startDate: '2020-3-24',
    endDate: '2020-4-24',
    time: '14:00',
    classroom: '教室2',
    day: '3'
},{
    id: '3',
    name: 'Mind-',
    type: 'python',
    teacher: '王大虎',
    startDate: '2020-3-24',
    endDate: '2020-4-24',
    time: '14:00',
    classroom: '教室3',
    day: '2'
},{
    id: '4',
    name: 'Mind--',
    type: 'C++',
    teacher: '赵铁柱',
    startDate: '2020-3-24',
    endDate: '2020-4-24',
    time: '18:30',
    classroom: '教室4',
    day: '7'
},{
  id: '5',
  name: 'Mind+',
  type: 'C++',
  teacher: '张大虎',
  startDate: '2020-3-24',
  endDate: '2020-4-24',
  time: '10:30',
  classroom: '教室5',
  day: '2'
}]

export default [
{
    url: '/classTable/info',
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
        data: classTable
      }
    }
  },
  {
    url: '/classTable/submit',
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
      const table = config.body
      const index = classTable.findIndex(item => item.id == table.id)
      if(index != -1){
        classTable[index] = table
        return {
          code: 20000,
          data: classTable
        }
      }else{
        classTable.push(table)
        return {
          code: 20000,
          data: classTable
        }
      }
    }
  },
  {
    url: '/classTable/delete',
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
      const id = config.body.id
      const index = classTable.findIndex(item => item.id == id)
      if(index != -1){
        classTable.splice(index, 1)
        return {
          code: 20000,
          data: classTable
        }
      }
    }
  }
]