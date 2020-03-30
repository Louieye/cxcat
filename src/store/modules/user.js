import { getAccessToken, login, logout, getInfo, getMenu } from '@/api/user'
import { getToken, setToken, removeToken, checkAccessToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { constantRoutes } from '@/router'

const getDefaultState = () => {
  return {
    //云服务器后台token
    access_token: '',
    //云服务器token过期时间
    timeOut: '0',
    //用户token
    token: getToken(),
    name: '',
    username: '',
    avatar: '',
    routes: constantRoutes,
    roles: ''
  }
}
const env = 'lyj-app'
const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ACCESS_TOKEN: (state, access_token) => {
    state.access_token = access_token
  },
  SET_TIMEOUT: (state, time) => {
    state.timeOut = time
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROUTES: (state,routes)=> {
    state.routes = constantRoutes.concat(routes)
  },
  SET_USERNAME: (state,username)=> {
    state.username = username
  },
  SET_ROLES: (state,roles)=> {
    state.roles = roles
  }
}

const actions = {

  // user login
  login({ commit }, userInfo) {
    //判断access_token是否过期
    const time = Date.parse(new Date())
    if(time > state.timeOut){
      checkAccessToken()
    }
    setTimeout(()=>{
      const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      const data = {
        env: env,
        query: 'db.collection(\"adminUsers\").where({username:\"' + username + '\"}).get()',
      }
      const submitData = JSON.stringify(data)
      login(submitData).then(response => {
        const res = JSON.parse(response.data)
        commit('SET_TOKEN', res.token)
        commit('SET_USERNAME', username)
        setToken(res.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
    },500)
    
  },

  // get user info
  getInfo({ commit, state }) {
    console.log('进入getinfo');
    const time = Date.parse(new Date())
    console.log(time);
    console.log(state.timeOut);
    console.log(time > state.timeOut);
    
    if(time > state.timeOut){
      console.log('token失效');
      
      checkAccessToken()
      // setTimeout(()=>{
      //   return new Promise((resolve, reject) => {
      //     const data = {
      //       env: env,
      //       query: 'db.collection(\"adminUsers\").where({username:\"' + state.username + '\"}).get()',
      //     }
      //     const submitData = JSON.stringify(data)
      //     getInfo(submitData).then(response => {
      //       const res = JSON.parse(response.data)
    
      //       if (!res) {
      //         reject('获取用户信息失败, 请重新登录')
      //       }
    
      //       const { name, avatar, roles } = res
    
      //       commit('SET_NAME', name)
      //       commit('SET_AVATAR', avatar)
      //       commit('SET_ROLES', roles)
            
      //       resolve(data)
      //     }).catch(error => {
      //       reject(error)
      //     })
      //   })
      // },500)
    }else{
      console.log('token存在');
      return new Promise((resolve, reject) => {
        const data = {
          env: env,
          query: 'db.collection(\"adminUsers\").where({username:\"' + username + '\"}).get()',
        }
        const submitData = JSON.stringify(data)
        getInfo(submitData).then(response => {
          console.log('getinfo请求');
          
          const res = JSON.parse(response.data)
  
          if (!res) {
            reject('获取用户信息失败, 请重新登录')
          }
  
          const { name, avatar, roles } = res
  
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          commit('SET_ROLES', roles)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
    
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  //权限路由
  addMenu({ commit, state }, routes) {
    return new Promise((resolve, reject) => {
      // getMenu().then((response) => {
      //   resolve(response)
      // }).catch(error => {
      //   reject(error)
      // })
      commit('SET_ROUTES',routes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

