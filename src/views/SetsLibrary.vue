<!-- eslint-disable no-unused-vars -->
<script setup>
import IconBackArrow from '@/icons/IconBackArrow.vue';
import { useSetsStore } from '@/store/flashcards'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue';
import { useCollection, useCurrentUser, useFirestore } from 'vuefire';
import { collection, getDocs } from 'firebase/firestore';

const db = useFirestore()
const user = useCurrentUser()
const setsStore = useSetsStore()
const router = useRouter()

setsStore.loadStatistics(useCollection(collection(db, 'users', user.value.uid, 'statistics')))

const lastSessionObj = ref({})

watch(
    () => setsStore.statistics,
    () => {
        loadStats()
    }
)

function loadStats() {
    if(!setsStore.statistics) return

    for (let item of setsStore.statistics) {
        let date = item['lastSession'].toDate();
        let now = new Date()
        let diff = now - date

        let seconds = Math.floor(diff / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);
        let years = Math.floor(days / 365);

        let timeAgo = years > 0 ? years + " years ago" :
                    days > 0 ? days + " days ago" :
                    hours > 0 ? hours + " hours ago" :
                    minutes > 0 ? minutes + " minutes ago" :
                    seconds + " seconds ago";

        lastSessionObj.value[item.set] = timeAgo
    }
}

</script>

<template>
    <nav class="navbar lato-light top-container">
          <a class="nav-link back" href="#" @click="router.push({name: 'menu'})"> 
            <IconBackArrow class="IconBackArrow"/> back
          </a>
          <div class="col title">Library</div>
    </nav>
    <div class="container container-mt-12">
        <div class="rectangle" v-for="(set, index) in setsStore.sets" :key=set.id>
            <div class="row align-items-center">
                <div class="col-3 set">
                    &#9634; set {{ index + 1 }}
                </div>
                <div class="col-8 last-session-text">
                    Last session: {{ lastSessionObj[set.id] ? lastSessionObj[set.id] : 'Never' }}
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col">
                    <p class="set-name nav-link back" href="#" @click="router.push({name: 'setview' , params: {name: set.id}})"> {{ set.id }}</p>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-secondary btn-first study-button" @click="router.push({name: 'study', params: {name: set.id}})">Study</button>
                </div> 
            </div>
        </div>
    </div>
    <div class="bottom-container container container-mt-12">
        <button type="button" class="btn btn-secondary btn-first bottom" @click="router.push({name: 'newset'})">Create new set</button>
    </div>
</template>

<style scoped>

.rectangle {
    height: 120px;
    width: 90%;  
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