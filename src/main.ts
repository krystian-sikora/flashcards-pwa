import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// ... other firebase imports

const firebaseConfig = {
    apiKey: "AIzaSyAwEBcnsS4DGQubmV5AIux2cA2Mjh-WYyQ",
    authDomain: "flashcards-23ed2.firebaseapp.com",
    projectId: "flashcards-23ed2",
    storageBucket: "flashcards-23ed2.appspot.com",
    messagingSenderId: "253190427910",
    appId: "1:253190427910:web:f9de14b478067ee30c3a87",
    measurementId: "G-YZG18L90XN"
}

export const firebaseApp = initializeApp(firebaseConfig)

const analytics = getAnalytics(firebaseApp)

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'flashcards')

const app = createApp(App)

app.use(router)
app.use(VueFire, {
    firebaseApp,
    modules: [
        VueFireAuth()
    ]
})

app.mount('#app')
