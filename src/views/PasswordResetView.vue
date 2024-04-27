<script setup>
import { ref } from 'vue'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const errorCode = ref('')
const auth = getAuth()
const router = useRouter()

function passwordReset() {
    if (!email.value) {
        errorCode.value = 'auth/invalid-email'
        return
    }
    if (email.value.length < 6) {
        errorCode.value = 'auth/invalid-email'
        return
    }
    sendPasswordResetEmail(auth, email.value)
        .then(() => {
            alert('Password reset email sent')
        })
        .catch((error) => {
            errorCode.value = error.code;
        // ..
        });
}

</script>

<template>
    <div class="container">
        <h1 class="logo">Flashcards</h1>
        <h2 class="lato-light primary-text">Reset your password</h2>
        <div class="container-mt-12">
            <input type="email" 
                class="form-control input" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Email"
                v-model="email"
                :style="errorCode === 'auth/invalid-email' ? 'border-color: red;' : ''">
            <button type="button" class="btn btn-secondary btn-first" @click="passwordReset()">
                Reset password
            </button>
            <h2 class="link" @click="router.push({name: 'signin'})">Go back to sign in page</h2>
        </div>
    </div>
</template>

<style scoped>

.link {
    font-size: 10px;
}

.link:hover {
    cursor: pointer;
}

</style>