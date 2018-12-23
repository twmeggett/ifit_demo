import Firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCJFaWyS4cu3ObQvb7TA67EcDoXUy1AYUE',
  authDomain: 'vue-data-grid.firebaseapp.com',
  databaseURL: 'https://vue-data-grid.firebaseio.com',
  projectId: 'vue-data-grid',
  storageBucket: 'vue-data-grid.appspot.com',
  messagingSenderId: '56443049230'
}

export const FirebaseApp = Firebase.initializeApp(config)
