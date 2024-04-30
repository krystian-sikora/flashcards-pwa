<!-- eslint-disable no-unused-vars -->
<script setup>
import { collection, doc } from 'firebase/firestore';
import { ref } from 'vue';
import IconBackArrow from '@/icons/IconBackArrow.vue';
import { useFirestore, useCurrentUser, useCollection } from 'vuefire';
import { onMounted, onBeforeUnmount, computed } from 'vue';


const auth = useCurrentUser()
const db = useFirestore()
const sets = useCollection(collection(db, 'users', auth.value.uid, 'flashcard-sets'))
console.log(sets.value)

const i = ref(0)

function nextFlashcard() {
    i.value = i.value + 1
}

onMounted(() => {
  startTimer()
  console.log(formattedTime.value)
})

onBeforeUnmount(() => {
  stopTimer()
  console.log(formattedTime.value)
})


const startStudyTime = () => {
    startTimer()

}

const stopStudyTime = () => {
    stopTimer()
    console.log(formattedTime.value)

}

const showingUnder = () => {
  if(stopTimer==true)
    return formattedTime.value
}

const startTime = ref(null)
const elapsedTime = ref(0)

// odpowiednie sformatowanie
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
                <button @click="nextFlashcard() + onFlashcardStudyTime()" type="button" class="btn btn-success difficulty">Easy</button>
                <button @click="nextFlashcard() + onFlashcardStudyTime()" type="button" class="btn btn-warning difficulty">Medium</button>
                <button @click="nextFlashcard() + onFlashcardStudyTime()" type="button" class="btn btn-danger difficulty">Hard</button>
            </div>
            <button @click="startStudyTime()" type="button" class="btn btn-info difficulty btn2">Start</button>
            <button @click="stopStudyTime()" type="button" class="btn btn-info difficulty btn2">Stop</button>

    </div>
    <div>
      <p>Learning time</p>
      <p>{{ formattedTime }}</p>
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

    .btn2{
      margin-top: 20px;
      }

</style>

<!-- 
    
    Statystyka dotyczaca poprawnych odpowiedzi 
    
    <template>
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

  <!-- algorytm bedzie dzialal tak ze zaleznie od odpowiedzi:

easy - bedzie kolejna fiszke dawal 2 razy rzadziej 
medium - normalnie
hard - 2 razy czesciej

ogolnie to bedzie tak ze hard np wrzuca ja w polowie trawajacego ciagu odp -->