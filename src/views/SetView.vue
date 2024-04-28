<script setup>
import IconBackArrow from '@/icons/IconBackArrow.vue';
import defineProps from 'vue'
import { useSetsStore } from '@/store/flashcards'
import { useRouter } from 'vue-router'
import { computed } from "@vue/reactivity";

const setsStore = useSetsStore()
const router = useRouter()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  name: String
})

const currentSet = computed(() => setsStore.getSet(props.name))
console.log(currentSet)
console.log(setsStore.sets)

</script>

<template>
     <nav class="navbar lato-light top-container">
          <a class="nav-link back" href="#" @click="router.push({name: 'library'})"> 
            <IconBackArrow class="IconBackArrow"/> back
          </a>
          <div class="col title" >{{ name }}</div>
    </nav>
    <div class="container">
        <div class="container-mt-12">
            <div class="rectangle" v-for="num in currentSet['questions'].length" :key="num">
                <h6 class="flashcard-text lato-light">&#9634; Flashcard 1</h6>
                <h1 class="flashcard-text">{{ currentSet['questions'][num - 1] }}</h1>
                <h5 class="flashcard-text">{{ currentSet['answers'][num - 1] }}</h5>
            </div>
        </div>
    </div>
    <div class="bottom-container">
        <button type="button" class="btn btn-secondary btn-first" style="margin-bottom: 10px;" 
        @click="router.push({name: 'study', params: {name: currentSet.id}})">Study</button>
        <button type="button" class="btn btn-secondary btn-first" 
        @click="router.push({name: 'addflashcard', params: {name: name}})">Add new flashcard</button>
    </div>
</template>
<style>

.rectangle {
    height: 120px;
    width: 100% ;
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