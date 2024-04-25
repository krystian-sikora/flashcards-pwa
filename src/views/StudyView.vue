<!-- eslint-disable no-unused-vars -->
<script setup>
import { collection, doc } from 'firebase/firestore';
import { ref } from 'vue';
import IconBackArrow from '@/icons/IconBackArrow.vue';
import { useFirestore, useCurrentUser, useDocument, useCollection } from 'vuefire'

const auth = useCurrentUser()
const db = useFirestore()
const sets = useCollection(collection(db, 'users', auth.value.uid, 'flashcard-sets'))
console.log(sets.value)

const i = ref(0)

function nextFlashcard() {
    i.value = i.value + 1
}

</script>

<template>
      <nav class="navbar lato-light">
          <a class="nav-link back" href="#"> 
            <IconBackArrow class="IconBackArrow"/> back
          </a>
          <div class="col title">Set_name</div>
    </nav>
    <div class="study">
        <div v-if="sets[0]">
            <h1 id="flashcard-label1" > {{ sets[0].questions[0] }} </h1>
            <h2 id="flashcard-label2" > {{ sets[0].questions[0] }} </h2>
        </div> 
            <div class="button-container2">
                <button @click="nextFlashcard()" type="button" class="btn btn-success difficulty">Easy</button>
                <button @click="nextFlashcard()" type="button" class="btn btn-warning difficulty">Medium</button>
                <button @click="nextFlashcard()" type="button" class="btn btn-danger difficulty">Hard</button>
            </div>
    </div>
</template>

<style>

    .button-container2{

        height: 45px;
        font-size: 1em;
        margin-top: 60px;
        font-family: 'Lato';
        margin-left: auto;
        margin-right: auto; 
        /* width: 30%; */
    }

    .difficulty {
            margin-right: 5px;
            margin-left: 5px;
            /* margin-left: auto; */
            /* margin-right: auto;  */
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

    }

</style>