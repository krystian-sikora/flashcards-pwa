<!-- eslint-disable no-unused-vars -->
<script setup>
import IconBackArrow from '@/icons/IconBackArrow.vue';
import IconBin from '@/icons/IconBin.vue';
import defineProps from 'vue'
import { useSetsStore } from '@/store/flashcards'
import { useRouter } from 'vue-router'
import { useFirestore, useCurrentUser, useCollection} from 'vuefire'
import { computed } from "@vue/reactivity";
import { doc, deleteDoc } from "firebase/firestore";
import { collection } from 'firebase/firestore';

const setsStore = useSetsStore()
const router = useRouter()
const user = useCurrentUser()
const db = useFirestore()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  name: String
})

const currentSet = computed(() => setsStore.getSet(props.name))
console.log(currentSet)
console.log(setsStore.sets)


function deleteFlashcard() {
    deleteDoc(doc(db, 'users', user.value.uid, 'flashcard-sets', props.name))
    setsStore.addSnapshot(useCollection(collection(db, 'users', user.value.uid, 'flashcard-sets')))
    router.push({ name: 'library' })
}

</script>

<template>
     <nav class="navbar lato-light top-container">
     
        <a class="nav-link back" href="#" @click="router.push({name: 'library'})"> 
            <IconBackArrow class="IconBackArrow"/> back
        </a> 
        <div class="#" >{{ name }} </div>
        
        <IconBin class="IconBin" @click="router.push({name: 'library'}), deleteFlashcard()" style="margin-right: 10px;"/>
        
    </nav>
    <div class="container">
        <div class="container-mt-12">
            <div class="rectangle" v-for="(num, index) in currentSet['questions'].length" :key="num">
                <h6 class="flashcard-text lato-light">&#9634; Flashcard {{ index + 1 }}</h6>
                <h1 class="flashcard-text">{{ currentSet['questions'][num - 1] }}</h1>
                <h5 class="flashcard-text">{{ currentSet['answers'][num - 1] }}</h5>
            </div>
            <div class="bottom-container">
                <button type="button" class="btn btn-secondary btn-first" style="margin-bottom: 10px;" 
                @click="router.push({name: 'study', params: {name: currentSet.id}})">Study</button>
                <button type="button" class="btn btn-secondary btn-first" 
                @click="router.push({name: 'addflashcard', params: {name: name}})">Add new flashcard</button>
            </div>
        </div>
    </div>
    
</template>
<style>

.btn-remove {
    margin-right: 5px;
}

.rectangle {
    height: 120px;
    width: 100% ;
    background-color: #cccccc;
    margin: auto;
    margin-top: 10px;
    border-radius: 10px;
}

.flashcard-text {
    text-align: left;
    margin-left: 8px;
}

.IconBin {
    width: 30px;
    margin-bottom: 2px;
    
}

</style>