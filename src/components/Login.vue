<template>
  <div id="firebaseui-auth-container">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Firebase from 'firebase'

export default {
  name: 'Login',
  computed: mapGetters(['firebaseUIApp']),
  mounted () {
    const uiConfig = {
      signInSuccessUrl: this.$router.resolve({name: 'HelloWorld'}).href,
      signInOptions: [
        Firebase.auth.GoogleAuthProvider.PROVIDER_ID
        // Firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // Firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // Firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // Firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ]
    }
    this.firebaseUIApp.start('#firebaseui-auth-container', uiConfig)
  },
  destroyed () {
    this.firebaseUIApp.reset()
  }
}
</script>

<style src="firebaseui/dist/firebaseui.css"></style>
