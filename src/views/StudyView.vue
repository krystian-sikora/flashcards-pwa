<script setup>
import { ref } from 'vue';

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
    <div class="study">
        <div v-if="flashcard">
            <h1 id="flashcard-label1" > {{ flashcard[i].question }} </h1>
            <h2 id="flashcard-label2" > {{ flashcard[i].answer }} </h2>
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