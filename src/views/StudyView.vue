<script setup>
import { ref } from 'vue';
import IconBackArrow from '@/icons/IconBackArrow.vue';

const flashcard = ref({
    0: {
        question: "Myszka",
        answer: 'Mouse'
    },
    1: {
        question: "Klawiatura",
        answer: 'Keyboard'
    },
    2: {
        question: "Biurko",
        answer: 'Desk'
    },
    3: {
        question: "Telefon",
        answer: 'Phone'
    },
    4: {
        question: "Lampa",
        answer: 'Lamp'
    },
    5: {
        question: "Ściana",
        answer: 'Wall'
    },
    6: {
        question: "Tapeta",
        answer: 'Wallpaper'
    },
    7: {
        question: "Dach",
        answer: 'Roof'
    },
    8: {
        question: "Buty",
        answer: 'Shoes'
    },
    9: {
        question: "Dywan",
        answer: 'Carpet'
    }
})

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
        <div v-if="flashcard">
            <h1> {{ flashcard[i].question }} </h1>
            <h2> {{ flashcard[i].answer }} </h2>
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
        margin-top: 100px;
        font-family: 'Lato';
        margin-left: auto;
        margin-right: auto; 
        /* width: 30%; */
    }

    .difficulty {
            margin-right: 10px;
            margin-left: 10px;
    }

</style>