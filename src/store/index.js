import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseAction, firebaseMutations } from 'vuexfire'

Vue.use(Vuex)

const strict = false

const state = {
  payments: [],
  firebaseApp: null
}

const getters = {
  user: state => state.user,
  firebaseApp: state => state.firebaseApp
}

const mutations = {
  set_firebase_app (state, firebaseApp) {
    state.firebaseApp = firebaseApp
  },
  ...firebaseMutations
}

const actions = {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 200)
  },
  update_payment_description (state, payment) {
    store.paymentsRef.child(`${payment.ID}/Description`).set(payment.Description)
  },
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
