<!-- eslint-disable no-unused-vars -->
<script setup>
import { collection, doc } from 'firebase/firestore';
import { ref } from 'vue';
import { useFirestore, useCurrentUser, useDocument, useCollection } from 'vuefire'

const auth = useCurrentUser()
const db = useFirestore()
const uid = useDocument(doc(db, 'users', auth.value.uid))
console.log(uid)
const sets = useCollection(collection(db, 'users', auth.value.uid, 'flashcard-sets'))
console.log(sets.value)

const i = ref(0)

function nextFlashcard() {
    i.value = i.value + 1
}

</script>

<template>
    <div class="study">
        <div v-if="sets[0]">
            <h1 id="flashcard-label1" > {{ sets[0].questions[0] }} </h1>
            <h2 id="flashcard-label2" > {{ sets[0].answers[0] }} </h2>
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

<!-- <template>
    <div>
      <h1>Quiz Results</h1>
      <div v-if="questions.length === 0">
        <p>No questions found.</p>
      </div>
      <div v-else>
        <div v-for="(question, index) in questions" :key="index">
          <p>{{ question.text }}</p>
          <button @click="selectDifficulty(index, 'easy')">Easy</button>
          <button @click="selectDifficulty(index, 'medium')">Medium</button>
          <button @click="selectDifficulty(index, 'hard')">Hard</button>
        </div>
        <button @click="calculatePercentage">Calculate Percentage</button>
        <div v-if="showResults">
          <p>{{ percentage }}% of your answers were correct.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        questions: [
          { text: "Question 1" },
          { text: "Question 2" },
          { text: "Question 3" }
        ],
        answers: [],
        showResults: false,
        percentage: 0
      };
    },
    methods: {
      selectDifficulty(index, difficulty) {
        if (difficulty === 'easy') {
          this.answers[index] = true;
        } else if (difficulty === 'medium') {
          this.answers[index] = null; // Skipped
        } else if (difficulty === 'hard') {
          this.answers[index] = false;
        }
      },
      calculatePercentage() {
        let correctCount = 0;
        for (let i = 0; i < this.questions.length; i++) {
          if (this.answers[i] === true) {
            correctCount++;
          }
        }
        const totalAnswered = this.answers.filter(answer => answer !== null).length;
        this.percentage = (correctCount / totalAnswered) * 100 || 0;
        this.showResults = true;
      }
    }
  };
  </script> -->

  <!-- consol loga jakiegos -->

  <!-- algorytm bedzie dzialal tak ze zaleznie od odpowiedzi:

easy - bedzie kolejna fiszke dawal 2 razy rzadziej 
medium - normalnie
hard - 2 razy czesciej

ogolnie to bedzie tak ze hard np wrzuca ja w polowie trawajacego ciagu odp -->