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
import { useRouter } from 'vue-router'

export const googleAuthProvider = new GoogleAuthProvider()
</script>

<script setup>

const email = ref('')
const password = ref('')
const repeatedPassword = ref('')
const errorCode = ref('')

const auth = useFirebaseAuth() // only exists on client side
const router = useRouter()

// display errors if any
const error = ref(null)
function signinRedirect() {
  signInWithRedirect(auth, googleAuthProvider).catch((reason) => {
    console.error('Failed signinRedirect', reason)
    error.value = reason
    alert(reason)
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
            router.push({name: 'menu'})
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
        <h2 class="lato-light primary-text">Sign Up</h2>
        <div class="container-mt-12">
            <input type="email" 
                class="form-control input" 
                aria-describedby="emailHelp" 
                placeholder="Email"
                v-model="email"
                :style="errorCode === 'auth/invalid-email' ? 'border-color: red;' : '' ||
                errorCode === 'auth/email-already-in-use' ? 'border-color: red;' : ''"
                >
                <h1 v-if="errorCode === 'auth/invalid-email'" style="color: red;">
                    <p>Invalid e-mail</p>
                </h1>
                <h1 v-if="errorCode === 'auth/email-already-in-use'" style="color: red;">
                    <p>E-mail already in use</p>
                </h1>
            <input type="password" 
                class="form-control input" 
                placeholder="Password"
                v-model="password"
                :style="errorCode === 'auth/weak-password' ? 'border-color: red;' : ''">
                <h1 v-if="errorCode === 'auth/weak-password'" style="color: red;">
                    <p>Weak passowrd</p>
                </h1>
            <input type="password" 
                class="form-control input" 
                placeholder="Repeat password"
                v-model="repeatedPassword"
                :style="errorCode === 'auth/passwords-dont-match' ? 'border-color: red;' : ''">
                <h1 v-if="errorCode === 'auth/passwords-dont-match'" style="color: red;">
                    <p>Passwords don't match</p>
                </h1>
            <button type="button" class="btn btn-secondary btn-first" @click="signUp()">
                Sign Up
            </button>
            <h2 style="font-size: 15px;">or</h2>
            <button type="button" class="btn btn-secondary btn-second" @click="signinRedirect()" style="position: relative;">
                <IconGoogle class="icon-google"/>
                Sign Up with Google
            </button>
            <h2 class="link" @click="router.push({name: 'signin'})">Already have an account?</h2>
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

p {
    font-family: 'Lato';
    font-size: 10px;
    color: red;
}

</style>