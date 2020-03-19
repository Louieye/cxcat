import { getToken, setToken, removeToken } from '@/utils/auth'

const replyState = () => {
    return {
      reply: []
    }
  }
  
  const state = replyState()

  const mutations = {
    SET_REPLY: (state, data) => {
      state.reply.push(data)
    }
  }

const actions = {
    
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}