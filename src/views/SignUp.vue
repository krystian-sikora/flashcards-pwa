<script>
import { 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getRedirectResult,
    signInWithRedirect
} from 'firebase/auth'
import { onMounted, ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'
import IconGoogle from '@/icons/IconGoogle.vue'

export const googleAuthProvider = new GoogleAuthProvider()
</script>

<script setup>

const email = ref('')
const password = ref('')
const repeatedPassword = ref('')
const errorCode = ref('')

const auth = useFirebaseAuth() // only exists on client side

// display errors if any
const error = ref(null)
function signinRedirect() {
  signInWithRedirect(auth, googleAuthProvider).catch((reason) => {
    console.error('Failed signinRedirect', reason)
    error.value = reason
  })
}

// only on client side
onMounted(() => {
  getRedirectResult(auth).catch((reason) => {
    console.error('Failed redirect result', reason)
    error.value = reason
  })
})

function signUp() {
    // Less than 6 is invalid because shortest email with country code would be a@b.pl
    if (email.value.length < 6) {
        errorCode.value = 'auth/invalid-email'
        return
    }

    if (password.value.length < 6) {
        errorCode.value = 'auth/weak-password'
        return
    }

    if (password.value !== repeatedPassword.value) {
        errorCode.value = 'auth/passwords-dont-match'
        return
    }


    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            errorCode.value = error.code;
            const errorMessage = error.message;
            console.log(errorCode.value)
            console.log(errorMessage)
        });
}

</script>

<template>
    <div class="container">
        <h1 class="logo">Flashcards</h1>
        <h2 class="lato-light">Sign Up</h2>
        <h1 v-if="errorCode">
            <p>todo: add error handling instead of below</p>
            {{ errorCode }}
        </h1>
        <div class="container-mt-12">
            <input type="email" 
                class="form-control input" 
                aria-describedby="emailHelp" 
                placeholder="Email"
                v-model="email">
            <input type="password" 
                class="form-control input" 
                placeholder="Password"
                v-model="password">
            <input type="password" 
                class="form-control input" 
                placeholder="Repeat password"
                v-model="repeatedPassword">
            <button type="button" class="btn btn-secondary btn-first" @click="signUp()">
                Sign Up
            </button>
            <h2 style="font-size: 15px;">or</h2>
            <button type="button" class="btn btn-secondary btn-second" @click="signinRedirect()" style="position: relative;">
                <IconGoogle class="icon-google"/>
                Sign Up with Google
            </button>
            <h2 style="font-size: 10px;">Already have an account?</h2>
        </div>
    </div>
</template>