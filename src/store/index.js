import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const strict = process.env.NODE_ENV !== 'production'

const state = {
  count: 0
}

const mutations = {
  increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
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
  mutations,
  actions
})

export default store
