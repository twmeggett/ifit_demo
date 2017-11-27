import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const strict = false

const state = {
  count: 0,
  user: null,
  firebaseApp: null,
  firebaseUIApp: null
}

const getters = {
  user: state => state.user,
  firebaseApp: state => state.firebaseApp,
  firebaseUIApp: state => state.firebaseUIApp
}

const mutations = {
  increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  },
  set_user (state, user) {
    state.user = user
  },
  set_firebase_app (state, firebaseApp) {
    state.firebaseApp = firebaseApp
  },
  set_firebase_ui_app (state, firebaseUIApp) {
    state.firebaseUIApp = firebaseUIApp
  }
}

const actions = {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 200)
  }
}

const store = new Vuex.Store({
  strict,
  state,
  getters,
  mutations,
  actions
})

export default store
