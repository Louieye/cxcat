
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const userInfo = [{
  id: '1',
  username: 'admin',
  password: '123456',
  token: 'admin-token'
},{
  id: '2',
  username: 'editor',
  password: '123456',
  token: 'editor-token'
}]

const users = {
  'admin-token': {
    password: '123456',
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

const headerData = {
  visited: '299',
  message: '198',
  order: '28',
  course: '15'
}

const tableData = [{
  id: '1',
  date: '2020-03-17 9:00',
  name: '张三',
  address: '1号教室',
  course: 'scratch'
},{
  id: '1',
  date: '2020-03-17 13:30',
  name: '张三',
  address: '3号教室',
  course: 'scratch'
},
{
  id: '1',
  date: '2020-03-17 9:00',
  name: '张三',
  address: '1号教室',
  course: 'scratch'
},{
  id: '2',
  date: '2020-03-17 13:30',
  name: '李四',
  address: '2号教室',
  course: 'scratch'
},{
  id: '2',
  date: '2020-03-17 13:30',
  name: '李四',
  address: '2号教室',
  course: 'scratch'
},{
  id: '2',
  date: '2020-03-17 13:30',
  name: '李四',
  address: '2号教室',
  course: 'scratch'
}]

export default [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }
      const index = userInfo.findIndex((item)=>{
        return item.username == username
      })
      if(config.body.password == userInfo[index].password){
        return {
          code: 20000,
          data: token
        }
      }else{
        return{
          code: 6024,
          message: '用户名或密码错误'
        }
      }
      
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  //获取课程表
  {
    url: '/vue-admin-template/home/table-data',
    type: 'get',
    response: config => {
      let { token } = config.headers
      let index = userInfo.findIndex( item =>{
        return item.token == token
      })
      if(index != -1){
        const id = userInfo[index].id
        const data = []
        tableData.forEach( item =>{
          if(item.id == id){
            data.push(item)
          }
        })
        return {
          code:20000,
          data: data
        }
      }
      return {
        code: 20000,
        data: token
      }
    }
  },

  //获取头部数据
  {
    url: '/vue-admin-template/home/header-data',
    type: 'get',
    response: config =>{
      let {token} = config.headers
      if(token){
        return {
          code: 20000,
          data: headerData
        }
      }else{
        return {
          code: 20000,
          data: '-1'
        }
      }
    }
  }
]
