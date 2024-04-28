<script setup>
import { ref, defineProps } from 'vue'
import IconBackArrow from '@/icons/IconBackArrow.vue';
import { useSetsStore } from '@/store/flashcards'
import { useRouter } from 'vue-router'
import { computed } from "@vue/reactivity";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  name: String
})

const setsStore = useSetsStore()
const router = useRouter()

const set = computed(() => setsStore.getSet(props.name))

const i = ref(0)

const currentQuestion = computed(() => set.value.questions[i.value])
const currentAnswer = computed(() => set.value.answers[i.value])

function nextFlashcard() {
    i.value = i.value + 1
}

const isVisible = ref(false)

</script>

<template>
    <nav class="navbar lato-light">
        <a class="nav-link back" href="#" @click="router.push({name: 'library'})"> 
            <IconBackArrow class="IconBackArrow"/> back
        </a>
        <div class="col title">Set_name</div>
    </nav>
    <div class="study">
        <div v-if="set">
            <h1 id="flashcard-label1">{{ currentQuestion }}</h1>
            <h2 id="flashcard-label2" @click="isVisible = true"> {{ isVisible ? currentAnswer : '?'}} </h2>
        </div> 
        <div class="button-container2">
            <button @click="nextFlashcard()" type="button" class="btn btn-success difficulty">Easy</button>
            <button @click="nextFlashcard()" type="button" class="btn btn-warning difficulty">Medium</button>
            <button @click="nextFlashcard()" type="button" class="btn btn-danger difficulty">Hard</button>
        </div>
    </div>
</template>

<style>

.button-container2 {
    height: 45px;
    font-size: 1em;
    margin-top: 60px;
    font-family: 'Lato';
    margin-left: auto;
    margin-right: auto; 
}

.difficulty {
    margin-right: 5px;
    margin-left: 5px;
    width: 30%;
    max-width: 126px;
    color: white;
}

#flashcard-label1{
    background-color: #969FAA;
    padding: 40px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto; 
    border-radius: 20px;
    margin-bottom: 30px;
    font-family: 'Lato';
    font-size: 40px;
    color: white;
}

#flashcard-label2{
    background-color: #969FAA;
    padding: 40px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px;
    font-family: 'Lato';
    font-size: 40px;
    color: white;
    cursor: pointer;
}

</style>