<script setup>
import IconBackArrow from '@/icons/IconBackArrow.vue';
import { useSetsStore } from '@/store/flashcards'
import { useRouter } from 'vue-router'

const setsStore = useSetsStore()
const router = useRouter()

</script>

<template>
    <nav class="navbar lato-light">
          <a class="nav-link back" href="#" @click="router.push({name: 'menu'})"> 
            <IconBackArrow class="IconBackArrow"/> back
          </a>
          <div class="col title">Library</div>
    </nav>
    <div class="container">
        <div class="container-mt-12">
            <h1 class="lato-light primary-text">Choose your set</h1>
            <button class="btn btn-secondary btn-first" v-for="set in setsStore.sets" :key="set.id">
                {{ set.id }}
            </button>
            <button type="button" class="btn btn-secondary btn-first bottom">Create new set</button>
        </div>
    </div>
</template>

<style>

.bottom {
    position: absolute;
    bottom: 20px;
    right: 20px;
    left: 20px;
}

</style>