<script setup>
import IconBackArrow from '@/icons/IconBackArrow.vue';
import { useSetsStore } from '@/store/flashcards'
import { useRouter } from 'vue-router'

const setsStore = useSetsStore()
const router = useRouter()

</script>

<template>
    <nav class="navbar lato-light">
          <a class="nav-link back" href="#" @click="router.push({name: 'menu'})"> 
            <IconBackArrow class="IconBackArrow"/> back
          </a>
          <div class="col title">Library</div>
    </nav>
    <div class="container">
        <div class="container-mt-12">
            <div class="rectangle">
                <h6 class="sets-set"> &#9634; set 1</h6>
                
                <button type="button" class="btn btn-secondary btn-first study-button">Study</button>
                <p class="set-name" v-for="set in setsStore.sets" :key="set.id"> {{ set.id }}</p>
                
            </div>
         
            <button type="button" class="btn btn-secondary btn-first bottom">Create new set</button>
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

.rectangle {
  height: 120px;
  width: auto;
  background-color: #b1b1b1;
  margin: auto;
  margin-top: 10px;
  border-radius: 10px;
}

.sets-set {
    color: white;
    text-align: left;
    margin-left: 8px;
}

.study-button {
    width: 100px;
    margin-left: 180px;
    margin-top: 10px;
}

.sets-lastsession {
    text-align: right;
    margin-right: 8px;
    color: white;
}

.set-name {
    text-align: left;
    font-size: xx-large;
}

</style>