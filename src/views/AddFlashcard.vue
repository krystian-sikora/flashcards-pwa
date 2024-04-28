<script setup>
import IconBackArrow from '@/icons/IconBackArrow.vue';
import { ref, defineProps } from 'vue'
import { useCurrentUser, useFirestore, useCollection } from 'vuefire'
import { setDoc, doc, collection } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import { useSetsStore } from '@/store/flashcards'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  name: String
})

const sets = useSetsStore()

const auth = useCurrentUser()
const db = useFirestore()
const router = useRouter()

const question = ref('')
const answer = ref('')
const questions = ref([])
const answers = ref([])

function addFlashcard() {
    questions.value.push(question.value)
    answers.value.push(answer.value)
    question.value = ''
    answer.value = ''
    console.log(questions.value)
    console.log(answers.value)
}

function save() {
    if (sets.getSet(props.name) === undefined) {
        setDoc(doc(db, 'users', auth.value.uid, 'flashcard-sets', props.name), {
            questions: questions.value,
            answers: answers.value
        })   
    } else {
        setDoc(doc(db, 'users', auth.value.uid, 'flashcard-sets', props.name), {
            questions: sets.getSet(props.name).questions.concat(questions.value),
            answers: sets.getSet(props.name).answers.concat(answers.value)
        })
    }
    sets.addSnapshot(useCollection(collection(db, 'users', auth.value.uid, 'flashcard-sets')))
    router.push({ name: 'library' })
}

</script>

<template>
    <nav class="navbar lato-light">
          <a class="nav-link back" href="#" @click="router.push({name: 'newset'})"> 
            <IconBackArrow class="IconBackArrow"/> back
          </a>
          <div class="col title">Add</div>
    </nav>
    <div class="container">
        <div class="container-mt-12">
            <h1 class="lato-light primary-text">Add new flashcard</h1>
            <input type="file" accept="image/*" capture="camera">
            <textarea class="form-control input" 
                id="exampleFormControlTextarea1" 
                rows="3"
                v-model="question"
                placeholder="Word or phrase">
         
            </textarea>
            <textarea class="form-control input" 
                id="exampleFormControlTextarea1" 
                rows="3"
                v-model="answer"
                placeholder="Explanation">
            </textarea>
            
            <button type="button" class="btn btn-secondary btn-first" @click="addFlashcard()">Add</button>
            <button type="button" class="btn btn-secondary btn-first" @click="save()">Save</button>
        </div>
    </div>
</template>