<script setup>

import IconLogout from '@/icons/IconLogout.vue'
import { signOut, getAuth } from 'firebase/auth'
import { useCurrentUser } from 'vuefire'

const auth = getAuth()
const user = useCurrentUser()

function logOut() {
  signOut(auth)
}

</script>



<template>
  <IconLogout class="icon-logout" v-if="user" @click="logOut()"/>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/signin">Sing In</router-link> |
    <router-link to="/signup">Sign Up</router-link> |
    <router-link to="/menu">Menu</router-link> |
    <router-link to="/study">Study</router-link>
  </nav>
  <h1 v-if="user">Signed in as {{ auth.currentUser.email }}</h1>
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

.icon-logout {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  width: 50px;
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
