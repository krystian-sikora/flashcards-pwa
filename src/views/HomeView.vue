<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<template>
  <div class="first">
    <h1 class="logo">Flashcards</h1>
    <h2 class="flashcard-font">Welcome to our Flashcards!</h2>
    <h3>To start please</h3>
    <button type="button" class="btn btn-secondary form-btn" @click="router.push({name: 'signin'})">
      Sign In
    </button>
    <h3>Or</h3>
    <button type="button" class="btn btn-secondary form-btn" @click="router.push({name: 'signup'})">
      Sing Up
    </button>
  </div>
</template>
  
<style>

.first {
  font-family: 'Lato';
  font-size: 20px
}

h1 {
    font-family: 'Chewy'; font-size: 50px; color: green;
    margin-top: 50px;
    margin-bottom: 70px;
}

.flashcard-font {
    font-family: 'Chewy'; font-size: 30px;
    margin-bottom: 50px;
}

</style>