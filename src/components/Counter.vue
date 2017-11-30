<template>
  <div class="hello" align="center">
    <b-card title="Counter From Vuex"
          img-src="/static/counter.jpg"
          img-alt="Counter Image"
          img-top
          style="max-width: 20rem;"
          class="mb-2">
      <p class="card-text">
        <div class="counter">{{ count.value }}</div>
      </p>
      <b-button @click="increment" variant="primary">+</b-button>
      <b-button @click="decrement" variant="primary">-</b-button>
    </b-card>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  name: 'Counter',
  computed: Vuex.mapState(['count', 'user']),
  methods: {
    increment () {
      this.$store.dispatch('incrementAsync')
    },
    decrement () {
      this.$store.commit('decrement')
    }
  },
  created () {
    let countRef = this.$store.state.firebaseApp.database().ref(
        (this.user ? `${this.user.uid}/count` : 'public/count'))
    // create the counter if it doesn't exist
    countRef.once('value', function (snapshot) {
      if (!snapshot.exists()) {
        countRef.child('value').set(0)
      }
    })
    this.$store.dispatch('setCountRef', countRef)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.counter {
  margin: 10px auto;
  border-radius: 3px;
  width: 200px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  font-size: 5rem;
  background-color: #f0f0f0;
  user-select: none;
  margin-top: 20px;
}
h1, h2 {
  font-weight: normal;
}
</style>
