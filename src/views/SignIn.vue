<script>
import router from '@/router'
import { 
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    getRedirectResult,
    signInWithRedirect,
} from 'firebase/auth'
import { onMounted, ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'
import IconGoogle from '@/icons/IconGoogle.vue'

export const googleAuthProvider = new GoogleAuthProvider()
</script>

<script setup>

const email = ref('')
const password = ref('')
const errorCode = ref('')

const auth = useFirebaseAuth()

// display errors if any
const error = ref(null)

function redirectToHome() {
    router.push('/menu')
}

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
            redirectToHome()

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
    getRedirectResult(auth)
        .then((result) => {
            console.log('redirect result', result)
            if (result && result.user) {
            // User is signed in.
                redirectToHome()
            }
        })
        .catch((reason) => {
            console.error('Failed redirect result', reason)
            error.value = reason
        })
})

</script>

<template>
    <div class="container">
        <h1 class="logo">Flashcards</h1>
        <h2 class="lato-light primary-text">Sign in</h2>
        <h1 v-if="errorCode === 'auth/too-many-requests'" style="color: red;">
            <p>Too many requests, please wait...</p>
        </h1>
        <div class="container-mt-12">
            <input type="email" 
                class="form-control input" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Email"
                v-model="email"
                :style="errorCode === 'auth/invalid-email' ? 'border-color: red;' : ''">
                <h1 v-if="errorCode === 'auth/invalid-email'" style="color: red;">
                    <p>Invalid e-mail</p>
                </h1>
            <input type="password" 
                class="form-control input" 
                id="exampleInputPassword1" 
                placeholder="Password"
                v-model="password"
                :style="errorCode === 'auth/invalid-credential' ? 'border-color: red;' : '' || 
                errorCode === 'auth/missing-password' ? 'border-color: red;' : ''"
                >
                <h1 v-if="errorCode === 'auth/invalid-credential'" style="color: red;">
                    <p>Invalid passowrd</p>
                </h1>
                <h1 v-if="errorCode === 'auth/missing-password'" style="color: red;">
                    <p>Missing password</p>
                </h1>
            <button type="button" class="btn btn-secondary btn-first" @click="signin()">
                Sign In
            </button>
            <h2 style="font-size: 15px;">
                or
            </h2>
            <button type="button" class="btn btn-secondary btn-second" @click="signinRedirect()" style="position: relative;">
                <IconGoogle class="icon-google"/>
                Sign In with Google
            </button>
            <h2 class="link" @click="router.push({name: 'resetpassword'})">Forgot password?</h2>
            <h2 class="link" @click="router.push({name: 'signup'})">Dont't have an account?</h2>
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