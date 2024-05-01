<script setup>
import { useRouter } from 'vue-router'
import { useSetsStore } from '@/store/flashcards'
import { collection, doc } from 'firebase/firestore';
import { useFirestore, useCurrentUser, useCollection, useDocument } from 'vuefire'
import IconLogout from '@/icons/IconLogout.vue'
import { signOut, getAuth } from 'firebase/auth'

const router = useRouter()
const setsStore = useSetsStore()

const user = useCurrentUser()
const auth = getAuth()
const db = useFirestore()

setsStore.updateLastSession(useDocument(doc(db, 'users', user.value.uid, 'previous-session', 'data')))

if (setsStore.sets.length === 0) {
  setsStore.addSnapshot(useCollection(collection(db, 'users', user.value.uid, 'flashcard-sets')))
}

function logOut() {
  signOut(auth).then(() => {
    console.log('logged out')
    router.push('/')
  }).catch((error) => {
    console.error('failed to log out', error)
  })
}

</script>

<template>
  <IconLogout class="icon-logout" v-if="user" @click="logOut()"/>
  <div class="container" style="margin-top: 200px;">
    <h1 class="logo">Flashcards</h1>
    <div class="container-mt-12">
      <button type="button" class="btn btn-secondary btn-first" 
        @click="router.push({name: 'newset'})">Create new set</button>
      <button type="button" class="btn btn-secondary btn-first" 
        @click="router.push({name: 'library'})">Sets library</button>
      <button type="button" class="btn btn-secondary btn-first" 
        @click="router.push({name: 'study', params:{name: setsStore.lastSession.set}, query: {lastSession: true}})" :disabled="!setsStore.lastSession">Previous session</button>
    </div>
  </div>
</template>

<style scoped>

.icon-logout {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  width: 40px;
}

.flashcard-button {
    height: 100px;
    font-size: 1em;
    font-family: 'Lato';
    margin-left: auto;
    margin-right: auto; 
    width: 90%;
    max-width: 400px;
}

.button-container {
    display: flex;
    flex-direction: column;
}

</style>