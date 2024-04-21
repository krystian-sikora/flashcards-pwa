<script>
import { 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getRedirectResult,
    signInWithRedirect
} from 'firebase/auth'
import { onMounted, ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'

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
    <div class="signIn">
        <h1 class="logo">
            Flashcards
        </h1>
        <h2>
            Sign Up
        </h2>
        
        <h1 v-if="errorCode">
            <p>todo: add error handling instead of below</p>
            {{ errorCode }}
        </h1>
        <div class="mb-3">
            <input type="email" 
                class="form-control" 
                aria-describedby="emailHelp" 
                placeholder="Enter email"
                v-model="email"
            >
        </div>
        <div class="mb-3">
            <input type="password" 
                class="form-control" 
                placeholder="Enter password"
                v-model="password"
            >
        </div>
        <div class="mb-3">
            <input type="password" 
                class="form-control" 
                placeholder="Repeat password"
                v-model="repeatedPassword"
            >
        </div>
        <button type="button" class="btn btn-secondary"
            @click="signUp()"
        >
            Sign In
        </button>
        <h2 class="medium">Or</h2>
        <button type="button" class="btn btn-secondary" @click="signinRedirect()">
            Sing Up with Google
        </button>
        <h2 class="small">Already have an account?</h2>
    </div>
</template>
  
<style>
    .signIn {font-family: 'Lato'; font-size: 20px; 
    margin-bottom: 50px;}

    button {
        width: 90%;
        max-width: 400px;
        font-size: 1em;
        margin-top: 30px;
        margin-bottom: 30px;
        margin-left: auto;
        margin-right: auto; 
        font-family: 'Lato';

    }

    .large {
        margin-bottom: 60px;
    }

    .medium {
        font-size: 15px;

    }

    .small {
        margin-bottom: 20px;
        font-size: 10px;

    }

    .form-control {
        width: 90%;
        margin-left: auto;
        margin-right: auto; 
        max-width: 400px;
        font-family: 'Lato';
    }

</style>