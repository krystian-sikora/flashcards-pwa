<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<template>
  <div class="container">
    
    <h1 class="logo">Flashcards</h1>
    <h2 class="lato-light primary-text">Welcome to our Flashcards!</h2>
    <h2 class="lato-light primary-text">To start please</h2>
    <div class="container-mt-12">
      <button type="button" class="btn btn-secondary btn-first" @click="router.push({name: 'signin'})">
        Sign In
      </button>
      <h2 style="font-size: 15px;">or</h2>
      <button type="button" class="btn btn-secondary btn-second" @click="router.push({name: 'signup'})">
        Sign Up
      </button>
    </div>
  </div>
</template>
  
<style>

.flashcard-font {
    font-family: 'Chewy'; font-size: 30px;
    margin-bottom: 50px;
}

</style>