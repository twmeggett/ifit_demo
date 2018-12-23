import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseAction, firebaseMutations } from 'vuexfire'

Vue.use(Vuex)

const strict = false

const state = {
  count: {value: '...'},  // will be bound as an object via VuexFire
  user: null,
  payments: [],
  firebaseApp: null
}

const getters = {
  user: state => state.user,
  firebaseApp: state => state.firebaseApp
}

const mutations = {
  increment (state) {
    store.countRef.child('value').set(state.count.value + 1)
  },
  decrement (state) {
    store.countRef.child('value').set(state.count.value - 1)
  },
  set_user (state, user) {
    state.user = user
  },
  set_payments (state, payments) {
    state.payments = payments
  },
  set_firebase_app (state, firebaseApp) {
    state.firebaseApp = firebaseApp
  },
  set_firebase_ui_app (state, firebaseUIApp) {
    state.firebaseUIApp = firebaseUIApp
  },
  ...firebaseMutations
}

const actions = {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 200)
  },
  setCountRef: firebaseAction(({ bindFirebaseRef }, ref) => {
    store.countRef = ref
    bindFirebaseRef('count', ref, { wait: true })
  }),
  setPaymentsRef: firebaseAction(({ bindFirebaseRef }, ref) => {
    store.paymentsRef = ref
    bindFirebaseRef('payments', ref, { wait: true })
  })
}

const store = new Vuex.Store({
  strict,
  state,
  getters,
  mutations,
  actions
})

export default store
