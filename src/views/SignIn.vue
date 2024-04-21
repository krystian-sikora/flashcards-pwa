<script>
import { 
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    getRedirectResult,
    signInWithRedirect,
} from 'firebase/auth'
import { onMounted, ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'

export const googleAuthProvider = new GoogleAuthProvider()
</script>

<script setup>

const email = ref('')
const password = ref('')
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

function signin() {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // todo: redirect to home page or smth
        })
        .catch((error) => {
            errorCode.value = error.code;
            const errorMessage = error.message;
            console.log(errorCode.value)
            // todo: handle errors like auth/invalid-email etc
  });
}



// only on client side
onMounted(() => {
  getRedirectResult(auth).catch((reason) => {
    console.error('Failed redirect result', reason)
    error.value = reason
  })
})

</script>

<template>
    <div class="signIn container">
        <h1 class="logo">Flashcards</h1>
        <h2 class="large">Sign in</h2>
        <h1 v-if="errorCode">
            <p>todo: add error handling instead of below</p>
            {{ errorCode }}
        </h1>
        <div class="mb-3">
            <input type="email" 
                class="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Enter email"
                v-model="email"
            >
        </div>
        <div class="mb-3">
            <input type="password" 
                class="form-control" 
                id="exampleInputPassword1" 
                placeholder="Enter password"
                v-model="password"
            >
        </div>
        <button type="button" class="btn btn-secondary" @click="signin()">
            Sign In
        </button>
        <h2 class="medium">
            Or
        </h2>
        <button type="button" class="btn btn-secondary" @click="signinRedirect()">
            Sing Up with Google
        </button>
        <h2 class="small">
            Forgot password?
        </h2>
        <h2 class="small">
            Dont't have an account?
        </h2>
    </div>
</template>

<style>

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

.form-label {
    font-family: 'Lato'; font-size: 20px; 
    margin-top: 20px;
    margin-bottom: 20px;
    width: 30%;
}

.small {
    margin-bottom: 20px;
    font-size: 10px;
}

.container {
    text-align: center;
}

.form-control {
    width: 90%;
    margin-left: auto;
    margin-right: auto; 
    max-width: 400px;
    font-family: 'Lato';
}

</style>