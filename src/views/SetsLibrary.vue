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
            <div class="rectangle" v-for="set in setsStore.sets" :key="set.id">
                <div class="row align-items-center">
                    <div class="col-3 set">
                        &#9634; set 1
                    </div>
                    <div class="col-8 last-session-text" >
                    Last session one week(s) ago
                    </div> 
                </div>
                <div class="row align-items-center">
                    <div class="col">
                        <p class="set-name nav-link back" href="#" @click="router.push({name: 'setview' , params: {name: set.id}})" v-for="set in setsStore.sets" :key="set.id"> {{ set.id }}</p>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-secondary btn-first study-button">Study</button>
                    </div> 
                </div>
                
                
                

                
                
            </div>
         
            <button type="button" class="btn btn-secondary btn-first bottom" @click="router.push({name: 'newset'})">Create new set</button>
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
  background-color: #cccccc;
  margin: auto;
  margin-top: 10px;
  border-radius: 10px;
}

.sets-set {
    color: white;
    text-align: left;
    margin-left: 8px;
}

.sets-lastsession {
    text-align: right;  
    color: white;
}

.set-name {
    text-align: left;
    font-size: xx-large;
    margin-left: 8px;
    margin-bottom: 20px;
}

.study-button {
    width: 100px;
    margin-bottom: 20px;
}

.set {
    text-align: left;
    margin-left: 8px;
    margin-bottom: 20px;
}

.last-session-text {
    font-size: small;
    text-align: right;
    margin-bottom: 20px;
}
</style>