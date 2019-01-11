<template>
  <div id="app">
    <AppNav/>
    <router-view/>
  </div>
</template>

<script>
import AppNav from '@/components/AppNav'

export default {
  name: 'app',
  components: {
    AppNav
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
