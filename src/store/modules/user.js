import { login, logout, getInfo, getMenu, getAccessToken } from '@/api/user'
import { getToken, setToken, removeToken, getTimeOut, setTimeOut, setAccessToken, getAccess_token, removeAccess, removeTimeOut } from '@/utils/auth'
import { resetRouter } from '@/router'
import { constantRoutes } from '@/router'

const getDefaultState = () => {
  return {
    // 云服务器后台token
    access_token: getAccess_token(),
    // 云服务器token过期时间
    timeOut: getTimeOut(),
    // 用户token
    token: getToken(),
    name: '',
    username: '',
    avatar: '',
    routes: constantRoutes,
    roles: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ACCESS_TOKEN: (state, access_token) => {
    state.access_token = access_token
  },
  SET_TIMEOUT: (state, time) => {
    state.timeOut = time
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      const data = {
        username: username,
        password: password
      }
      const submitData = JSON.stringify(data)
      login(submitData).then(res => {
        if (res.data.errcode != 0) {
          reject('服务器错误')
        }
        const data = JSON.parse(res.data.resp_data)
        if (data.flag == '0') {
          reject('密码错误')
        } else if (data.flag == '-1') {
          reject('用户名不存在')
        } else if (data.flag == '1') {
          commit('SET_TOKEN', data.token)
          commit('SET_USERNAME', username)
          setToken(data.token)
          resolve()
        }
      }).catch(error => {
        reject('未知错误')
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const data = {
        env: 'lyj-app',
        query: 'db.collection(\"adminUsers\").where({token:\"' + state.token + '\"}).get()'
      }
      const submitData = JSON.stringify(data)
      getInfo(submitData).then(response => {
        const data = JSON.parse(response.data.data)
        console.log('getinfo', data)

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar, roles, username } = data
        console.log('getinfo返回值', data)

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_ROLES', roles)
        commit('SET_USERNAME', username)
        console.log(state)

        resolve(data)
      }).catch(error => {
        reject('getinfo出错：')
      })
    })
  },

  // get access_token
  getAccessToken({ commit }) {
    return new Promise((resolve, reject) => {
      getAccessToken().then(response => {
        const time = new Date().getTime()
        const res = response.data
        console.log(res)
        commit('SET_ACCESS_TOKEN', res.access_token)
        commit('SET_TIMEOUT', res.expires_in * 1000 + time - 300000)
        setTimeOut(res.expires_in * 1000 + time - 300000)
        setAccessToken(res.access_token)
        console.log('设置accesstoken', state.access_token)
        console.log('time', res.expires_in * 1000 + time - 300000)
        console.log('设置timeOut', state.timeOut)
        resolve('getAccessToken success')
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      //   removeToken() // must remove  token  first
      //   resetRouter()
      //   commit('RESET_STATE')
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
      removeToken()
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeAccess()
      removeTimeOut()
      commit('RESET_STATE')
      resolve()
    })
  },
  // 权限路由
  addMenu({ commit, state }, routes) {
    return new Promise((resolve, reject) => {
      // getMenu().then((response) => {
      //   resolve(response)
      // }).catch(error => {
      //   reject(error)
      // })
      commit('SET_ROUTES', routes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

