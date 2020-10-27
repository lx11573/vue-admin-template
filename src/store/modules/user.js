import { login, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }, permission = '') {
    return new Promise((resolve, reject) => {
      const data = {
        authorities: [
          {
            'authority': 'sys:permission:add'
          },
          {
            'authority': 'sys:org:manage'
          },
          {
            'authority': 'sys:org:add'
          },
          {
            'authority': 'sys:staff:add'
          },
          {
            'authority': 'sys:dict:add'
          },
          {
            'authority': 'sys:config:add'
          },
          {
            'authority': 'sys:candidate:add'
          },
          {
            'authority': 'businessAgent'
          },
          {
            'authority': 'depositRecord'
          },
          {
            'authority': 'sys:permission:edit'
          },
          {
            'authority': 'sys:org:edit'
          },
          {
            'authority': 'sys:staff:manage'
          },
          {
            'authority': 'sys:staff:edit'
          },
          {
            'authority': 'sys:dict:edit'
          },
          {
            'authority': 'sys:config:edit'
          },
          {
            'authority': 'sys:candidate:edit'
          },
          {
            'authority': 'inviteDetail'
          },
          {
            'authority': 'depositReview'
          },
          {
            'authority': 'sys:permission:delete'
          },
          {
            'authority': 'sys:org:delete'
          },
          {
            'authority': 'sys:staff:delete'
          },
          {
            'authority': 'sys:dict:valid'
          },
          {
            'authority': 'sys:config:delete'
          },
          {
            'authority': 'sys:candidate:valid'
          },
          {
            'authority': 'withdrawManager'
          },
          {
            'authority': 'sys:perm:manage'
          },
          {
            'authority': 'sys:role:manage'
          },
          {
            'authority': 'sys:staff:org'
          },
          {
            'authority': 'sys:dict:delete'
          },
          {
            'authority': 'sys:candidate:delete'
          },
          {
            'authority': 'rateManager'
          },
          {
            'authority': 'sys:dict:manage'
          },
          {
            'authority': 'sys:staff:valid'
          },
          {
            'authority': 'sys:config:manage'
          },
          {
            'authority': 'sys:staff:role'
          },
          {
            'authority': 'agentManager'
          },
          {
            'authority': 'sys:log:search'
          },
          {
            'authority': 'message-manager'
          },
          {
            'authority': 'sys:candidate:manage'
          },
          {
            'authority': 'DEV_TMP'
          },
          {
            'authority': 'sys:role:add'
          },
          {
            'authority': 'sys:role:edit'
          },
          {
            'authority': 'sys:role:delete'
          },
          {
            'authority': 'sys:webmanag:del'
          },
          {
            'authority': 'achievementDetailed'
          },
          {
            'authority': 'achievementSettle'
          },
          {
            'authority': 'settleRecord'
          },
          {
            'authority': 'message-manager-list'
          },
          {
            'authority': 'data-canvas'
          }
        ],
        name: 'sysman'
      }
      if (permission === '') {
        data.authorities.push({
          authority: 'demo_admin'
        })
      }
      commit('SET_ROLES', data.authorities)
      commit('SET_NAME', name)
      commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
      commit('SET_INTRODUCTION', data.name)
      resolve(data)
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    // const token = role + '-token'

    // commit('SET_TOKEN', token)
    // setToken(token)
    let data = ''
    if (role === 'editor') {
      data = 'editor'
    }
    const roles = await dispatch('getInfo', data)
    console.log('roles => ', roles)
    resetRouter()

    // generate accessible routes map based on roles
    console.log(roles)
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
