<script setup>




</script>

<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/signin">Sing In</router-link> |
    <router-link to="/signup">Sign Up</router-link> |
    <router-link to="/menu">Menu</router-link> |
    <router-link to="/study">Study</router-link>
  </nav> -->
  <router-view style="padding-top: 100px;"/>
</template>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

</style>
