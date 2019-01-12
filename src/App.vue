<template>
  <div id="app">
    <AppNav/>
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import AppNav from '@/components/AppNav'
import Footer from '@/components/Footer'

export default {
  name: 'app',
  components: {
    AppNav,
    Footer
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
  position: relative;

  a {
    text-decoration: none !important;
  }
}
</style>
