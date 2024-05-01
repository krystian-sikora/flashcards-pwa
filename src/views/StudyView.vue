<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref, defineProps } from 'vue'
import IconBackArrow from '@/icons/IconBackArrow.vue';
import { useSetsStore } from '@/store/flashcards'
import { useRouter, useRoute } from 'vue-router'
import { computed } from "@vue/reactivity";
import { onMounted, onBeforeUnmount } from 'vue';
import { setDoc, doc, deleteDoc } from 'firebase/firestore'
import { useCurrentUser, useDocument, useFirestore } from 'vuefire'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  name: String,
  isLastSession: Boolean
})

const auth = useCurrentUser()
const db = useFirestore()

const setsStore = useSetsStore()
const router = useRouter()
const route = useRoute()

const set = computed(() => setsStore.getSet(props.name))

const isVisible = ref(false)

const easyFlashcards = ref([])
const mediumFlashcards = ref([])
const hardFlashcards = ref([])

function populateFlashcards() {
    console.log(route.query.lastSession)
    if (route.query.lastSession) {
        console.log('last session')
        console.log(setsStore.lastSession)
        easyFlashcards.value = setsStore.lastSession.easy
        mediumFlashcards.value = setsStore.lastSession.medium
        hardFlashcards.value = setsStore.lastSession.hard
        return
    }
    for (let i = 0; i < set.value.questions.length; i++) {
        hardFlashcards.value.push({
            question: set.value.questions[i],
            answer: set.value.answers[i],
        })
    }
}

populateFlashcards()

const nextFlashcard = ref()


const flashcardCategories = ref([easyFlashcards, mediumFlashcards, hardFlashcards])

function setDiff(diff) {
    if (nextFlashcard.value) {
        let category = findAndDeleteFlashcard(nextFlashcard.value)
        switch (diff) {
            case 0:
                if (category === 0) break
                else easyFlashcards.value.push(nextFlashcard.value)
                break
            case 1:
                mediumFlashcards.value.push(nextFlashcard.value)
                break
            case 2:
                hardFlashcards.value.push(nextFlashcard.value)
                break
        }
    }

    chooseRandomFlashcard()
}

function findAndDeleteFlashcard(flashcard) {
    for (let i = 0; i < flashcardCategories.value.length; i++) {
        for (let j = 0; j < flashcardCategories.value[i].value.length; j++) {
            if (flashcardCategories.value[i].value[j].question === flashcard.question 
                    && flashcardCategories.value[i].value[j].answer === flashcard.answer) {
                flashcardCategories.value[i].value.splice(j, 1)
                return i
            }
        }
    }
    return null
}

function noFlashcardsLeft() {
    for (let cat of flashcardCategories.value) {
        if (cat.value.length > 0) {
            return false
        }
    }
    return true

}

function chooseRandomFlashcard() {
    if (noFlashcardsLeft()) {
        return
    }
    isVisible.value = false
    const defaultCategoriesWeights = [1, 3, 5]
    const categoriesWeights = []
    for (const cat of flashcardCategories.value) {
        if (cat.value.length > 0) {
            categoriesWeights.push(defaultCategoriesWeights[flashcardCategories.value.indexOf(cat)])
        } else {
            categoriesWeights.push(0)
        }
    }

    const randomCategoryIndex = getRandomWeightedIndex(categoriesWeights)
    const randomCategory = flashcardCategories.value[randomCategoryIndex]

    if (randomCategory.value.length > 0) {
        const randomIndex = Math.floor(Math.random() * randomCategory.value.length)
        nextFlashcard.value = randomCategory.value[randomIndex]
        // randomCategory.splice(randomIndex, 1)
        return
    }
    nextFlashcard.value = flashcardCategories.value[2].value[0]
}

chooseRandomFlashcard()

function getRandomWeightedIndex(weights) {
    let totalWeight = 0
    
    for (const weight of weights) {
        totalWeight += weight
    }

    const randomValue = Math.random() * totalWeight;
    let currentWeight = 0

    for (let i = 0; i < weights.length; i++) {
        currentWeight += weights[i];
        if (randomValue < currentWeight) {
            return i
        }
    }

    return weights.length - 1; // Domyślnie zwraca indeks ostatniej kategorii
}

function vibrate() {
    if (window.navigator.vibrate){
        window.navigator.vibrate(100)
    }
}

const easySound =  new Audio(require('@/sounds/easy.mp3'))
const mediumSound =  new Audio(require('@/sounds/medium.mp3'))
const hardSound = new Audio(require('@/sounds/hard.mp3'))

function getNumberOfFlashcards() {
    return setsStore.getSet(props.name).questions.length
}

const stat_doc = useDocument(doc(db, 'users', auth.value.uid, 'statistics', props.name))

function countAverage(array) {
    let sum = 0
    for (let i = 0; i < array.length; i++) {
        sum += array[i]
    }
    return sum / array.length
}

function saveSessionData() {
    if (noFlashcardsLeft()) {
        let data
        
        if (stat_doc.value) {
            data = {
                set: set.value.id,
                sessionDurationsInSeconds: stat_doc.value.sessionDurationsInSeconds.concat(elapsedTime.value),
                averageSessionDurationInSeconds: countAverage(stat_doc.value.sessionDurationsInSeconds.concat(elapsedTime.value)),
                numberOfFlashcards: getNumberOfFlashcards(),
                lastSession: new Date()
            }
            console.log(data)
        } else {
            data = {
                set: set.value.id,
                sessionDurationsInSeconds: [elapsedTime.value],
                averageSessionDuration: elapsedTime.value,
                numberOfFlashcards: getNumberOfFlashcards(),
                lastSession: new Date()
            }
        }
        setDoc(doc(db, 'users', auth.value.uid, 'statistics', props.name), data)
        setsStore.updateLastSession(useDocument(doc(db, 'users', auth.value.uid, 'previous-session', 'data')))

        deleteDoc(doc(db, 'users', auth.value.uid, 'previous-session', 'data'))
    } else {
        const data = {
            set: set.value.id,
            easy: easyFlashcards.value,
            medium: mediumFlashcards.value,
            hard: hardFlashcards.value,
        }
        setDoc(doc(db, 'users', auth.value.uid, 'previous-session', 'data'), data)
    }
    
}

onMounted(() => {
  startTimer()
})

onBeforeUnmount(() => {
  stopTimer()
  saveSessionData()
})

const startTime = ref(null)
const elapsedTime = ref(0)

const formattedTime = computed(() => {
    const hours = Math.floor(elapsedTime.value / 3600)
    const minutes = Math.floor((elapsedTime.value % 3600) / 60)
    const seconds = elapsedTime.value % 60
    return `${hours}:${minutes}:${seconds}`
})

const startTimer = () => {
    startTime.value = new Date()
    updateElapsedTime()
};

const updateElapsedTime = () => {
    setInterval(() => {
        const now = new Date()
        elapsedTime.value = Math.floor((now - startTime.value) / 1000)
    }, 1000)
}

const stopTimer = () => {
    clearInterval(updateElapsedTime)
}

</script>

<template>
    <nav class="navbar lato-light">
        <a class="nav-link back" href="#" @click="router.push({name: 'library'})"> 
            <IconBackArrow class="IconBackArrow"/> back
        </a>
        <div class="col title">{{ props.name }}</div>
    </nav>
    <div class="study" :style="noFlashcardsLeft() ? 'display: None' : ''">
        <div v-if="nextFlashcard">
            <h1 id="flashcard-label1">{{ nextFlashcard.question }}</h1>
            <h2 id="flashcard-label2" @click="isVisible = true"> {{ isVisible ? nextFlashcard.answer : '?'}} </h2>
        </div> 
        <div class="button-container2">
            <button @click="setDiff(0), easySound.play(), vibrate()" type="button" class="btn btn-success difficulty">Easy</button>
            <button @click="setDiff(1), mediumSound.play(), vibrate()" type="button" class="btn btn-warning difficulty">Medium</button>
            <button @click="setDiff(2), hardSound.play(), vibrate()" type="button" class="btn btn-danger difficulty">Hard</button>
        </div>
    </div>
    <div class="container" :style="!noFlashcardsLeft() ? 'display: None' : ''">
        <h1 class="lato-light primary-text">Congratulations!</h1>
        <h2 class="lato-light primary-text">You have finished the set!</h2>
        <button type="button" class="btn btn-secondary btn-first" @click="router.push({name: 'library'})">
            Back to library
        </button>
    </div>
</template>

<style scoped>

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
    background-color: #cccccc;
    padding: 40px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto; 
    border-radius: 20px;
    margin-bottom: 30px;
    font-family: 'Lato';
    font-size: 40px;
    color: white;
    margin-top: 60px;
}

#flashcard-label2{
    background-color: #cccccc;
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