<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="danger">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand :to="{name: 'HelloWorld'}">Vue 2</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item :to="{name: 'HelloWorld'}" exact>Hello</b-nav-item>
          <b-nav-item :to="{name: 'Counter'}">Counter</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'AppNav',
  computed: {
    username () {
      return 'Foo'
    }
  }
}
</script>
