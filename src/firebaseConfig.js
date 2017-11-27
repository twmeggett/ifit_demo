import Firebase from 'firebase'
import FirebaseUI from 'firebaseui'
import store from './store'

const config = {
  apiKey: 'AIzaSyDOthcx9EAS4Hqy7YI0_vrNV923aM8x41w',
  authDomain: 'weight-track-644d5.firebaseapp.com',
  databaseURL: 'https://weight-track-644d5.firebaseio.com',
  storageBucket: 'weight-track-644d5.appspot.com',
  messagingSenderId: '102598797725'
}

export const FirebaseApp = Firebase.initializeApp(config)
export const FirebaseUIApp = new FirebaseUI.auth.AuthUI(Firebase.auth(FirebaseApp))

Firebase.auth().onAuthStateChanged(user => {
  store.commit('set_user', user)
})
