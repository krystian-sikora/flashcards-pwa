<script setup>
import IconBackArrow from '@/icons/IconBackArrow.vue';
import defineProps from 'vue'
import { useSetsStore } from '@/store/flashcards'
import { useRouter } from 'vue-router'
const setsStore = useSetsStore()
const router = useRouter()
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  name: String
})
</script>

<template>
     <nav class="navbar lato-light">
          <a class="nav-link back" href="#" @click="router.push({name: 'library'})"> 
            <IconBackArrow class="IconBackArrow"/> back
          </a>
          <div class="col title" v-for="set in setsStore.sets" :key="set.id">{{ set.id }}</div>
    </nav>
    <div class="container">
        <div class="container-mt-12">
            <div class="rectangle">
                <h6 class="flashcard-text lato-light">&#9634; Flashcard 1</h6>
                <h1 class="flashcard-text">Word or phrase</h1>
                <h5 class="flashcard-text">Explanation</h5>
            </div>
            


            <button type="button" class="btn btn-secondary btn-first bottom">Study</button>
            <button type="button" class="btn btn-secondary btn-first bottom2">Add new flashcard</button>

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

    .bottom2 {
        position: absolute;
        bottom: 70px;
        right: 20px;
        left: 20px;
        
    }

    .rectangle {
        height: 120px;
        width: auto;
        background-color: #cccccc;
        margin: auto;
        margin-top: 10px;
        border-radius: 10px;
        }

    .flashcard-text {
        text-align: left;
        margin-left: 8px;

        }
</style>