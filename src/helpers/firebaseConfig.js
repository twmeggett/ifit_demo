import Firebase from 'firebase'
import FirebaseUI from 'firebaseui'
import store from '@/store'

const config = {
  apiKey: 'AIzaSyDghyGJtYmOY93Iw4cTaM9R2ydPNX2r66U',
  authDomain: 'counter-demo-w00t.firebaseapp.com',
  databaseURL: 'https://counter-demo-w00t.firebaseio.com',
  projectId: 'counter-demo-w00t',
  storageBucket: 'counter-demo-w00t.appspot.com',
  messagingSenderId: '92757085039'
}

export const FirebaseApp = Firebase.initializeApp(config)
export const FirebaseUIApp = new FirebaseUI.auth.AuthUI(Firebase.auth(FirebaseApp))

Firebase.auth().onAuthStateChanged(user => {
  store.commit('set_user', user)
})
