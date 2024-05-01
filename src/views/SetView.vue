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
        <div class="col title" >{{ name }} </div>
        
        <IconBin class="IconBin" @click="router.push({name: 'library'}), deleteFlashcard()" style="margin-right: 10px;"/>
        
    </nav>
    <div class="container container-mt-12">
        <div class="rectangle" v-for="(num, index) in currentSet['questions'].length" :key="num">
            <h6 class="flashcard-text lato-light">&#9634; Flashcard {{ index + 1 }}</h6>
            <h1 class="flashcard-text">{{ currentSet['questions'][num - 1] }}</h1>
            <h5 class="flashcard-text">{{ currentSet['answers'][num - 1] }}</h5>
        </div>
    </div>
    <div class="bottom-container container-mt-12" style="max-width: 500px; margin: 0 auto;">
        <button type="button" class="btn btn-secondary btn-first bottom"
            @click="router.push({name: 'study', params: {name: currentSet.id}})">Study</button>
        <button type="button" class="btn btn-secondary btn-first bottom"
            @click="router.push({name: 'addflashcard', params: {name: name}})">Add new flashcard</button>
    </div>
</template>

<style scoped>

.bottom {
    width: 90%;
    max-width: 400px;
    margin-top: 10px;
}

.btn-remove {
    margin-right: 5px;
}

.rectangle {
    height: 120px;
    width: 90% ;
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
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    height: 24px;
}

</style>