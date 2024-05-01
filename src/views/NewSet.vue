<script setup>
import IconBackArrow from '@/icons/IconBackArrow.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const setName = ref('')
const router = useRouter()
const err = ref(false)

function create() {
    if (setName.value === '') {
        err.value = true
        return
    }
    router.push({name: 'addflashcard', params: {name: setName.value}})
}

</script>
<template>
    <nav class="navbar lato-light">
        <a class="nav-link back" href="#" @click="router.push({name: 'menu'})"> 
            <IconBackArrow class="IconBackArrow"/> back
        </a>
        <div class="col title">New</div>
    </nav>
    <div class="container">
        <div class="container-mt-12">
            <h1 class="lato-light primary-text" style="margin-top: 100px">Enter the name</h1>
            <input class="form-control input" placeholder="My new set" v-model="setName" :style="err ? 'border-color: red' : ''">
            <button type="button" 
            class="btn btn-secondary btn-first"
            @click="create()">
                Create
            </button>
        </div>
    </div>
</template>