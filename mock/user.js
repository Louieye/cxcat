
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
  name: '王大虎',
  token: 'admin-token',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  roles: ['admin']
}, {
  id: '2',
  username: 'editor',
  password: '123456',
  name: '张大虎',
  token: 'editor-token',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  roles: ['editor']
}, {
  id: '3',
  username: 'lyj',
  password: '123456',
  name: '赵铁柱',
  token: 'admin-token',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  roles: ['admin']
}]

export const users = {
  'admin-token': {
    password: '123456',
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '王大虎'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '赵铁柱'
  },
  'zdh-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '张大虎'
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
}, {
  id: '1',
  date: '2020-03-17 13:30',
  name: '张三',
  address: '3号教室',
  course: 'scratch'
},
{
  id: '3',
  date: '2020-03-17 9:00',
  name: '张三',
  address: '1号教室',
  course: 'scratch'
}, {
  id: '2',
  date: '2020-03-17 13:30',
  name: '李四',
  address: '2号教室',
  course: 'scratch'
}, {
  id: '2',
  date: '2020-03-17 13:30',
  name: '李四',
  address: '2号教室',
  course: 'scratch'
}, {
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
      

      // mock error
      // if (!token) {
      //   return {
      //     code: 60204,
      //     message: 'Account and password are incorrect.'
      //   }
      // }
      const index = userInfo.findIndex((item) => {
        return item.username === username
      })
      if (config.body.password === userInfo[index].password) {
        const token = {
          token: userInfo[index].token
        }
        return {
          code: 20000,
          data: token
        }
      } else {
        return {
          code: 6024,
          message: '用户名或密码错误'
        }
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'post',
    response: config => {
      const { token } = config.headers
      const index = userInfo.findIndex(item=>item.username === config.body.username)
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
        data: info
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

  // 获取课程表
  {
    url: '/vue-admin-template/home/table-data',
    type: 'get',
    response: config => {
      const { token } = config.headers
      if (users[token]) {
        return {
          code: 20000,
          data: tableData
        }
      }
    }
  },

  // 获取头部数据
  {
    url: '/vue-admin-template/home/header-data',
    type: 'get',
    response: config => {
      const { token } = config.headers
      if (token) {
        return {
          code: 20000,
          data: headerData
        }
      } else {
        return {
          code: 20000,
          data: '-1'
        }
      }
    }
  },
  // 获取路由
  {
    url: '/vue-admin-template/user/getMenu',
    type: 'get',
    response: config => {
      const { token } = config.headers
      if (token) {
        return {
          code: 20000,
          data: users[token].roles
        }
      } else {
        return {
          code: 20000,
          message: '路由菜单获取失败'
        }
      }
    }
  },
  // 权限管理页面-获取用户
  {
    url: '/permission/info',
    type: 'get',
    response: config => {
      const { token } = config.headers
      // mock errorpermi
      if (token !== 'admin-token') {
        return {
          code: 50008,
          message: '权限验证失败，请重新登录'
        }
      }

      return {
        code: 20000,
        data: userInfo
      }
    }
  },

  // 权限管理页面-新增用户
  {
    url: '/permission/submit',
    type: 'post',
    response: config => {
      const { token } = config.headers
      // mock error
      if (token !== 'admin-token') {
        return {
          code: 50008,
          message: '权限验证失败'
        }
      }
      const data = config.body
      data.token += '-token'
      userInfo.push(data)
      return {
        code: 20000,
        data: data
      }
    }
  },
  // 权限管理页面-修改密码
  {
    url: '/permission/change',
    type: 'post',
    response: config => {
      const { token } = config.headers
      // mock error
      if (token !== 'admin-token') {
        return {
          code: 50008,
          message: '权限验证失败'
        }
      }
      const data = config.body
      const index = userInfo.findIndex(item => item.id === data.id)
      if(index !== -1){
        userInfo[index].password = data.password
      }
      return {
        code: 20000,
        data: userInfo
      }
    }
  },
  // 权限管理页面-删除用户
  {
    url: '/permission/delete',
    type: 'post',
    response: config => {
      const { token } = config.headers
      // mock error
      if (token !== 'admin-token') {
        return {
          code: 50008,
          message: '权限验证失败'
        }
      }
      const data = config.body
      const index = userInfo.findIndex(item => item.id === data.id)
      if(index !== -1){
        userInfo.splice(index, 1)
      }
      return {
        code: 20000,
        data: userInfo
      }
    }
  }
]
