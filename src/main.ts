import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles.css'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
import { createPinia } from 'pinia'
import 'firebase/messaging';
import { getMessaging, getToken } from 'firebase/messaging'
 
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_KEY,
    authDomain: "flashcards-23ed2.firebaseapp.com",
    projectId: "flashcards-23ed2",
    storageBucket: "flashcards-23ed2.appspot.com",
    messagingSenderId: "253190427910",
    appId: "1:253190427910:web:f9de14b478067ee30c3a87",
    measurementId: "G-YZG18L90XN"
}

// initializeApp(firebaseConfig);

export const firebaseApp = initializeApp(firebaseConfig)

const messaging = getMessaging(firebaseApp);


// Request Permission of Notifications
function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }})}

  // Get Token
//   getToken(messaging, {vapidKey: "BJ5HwScF1VWJ6eRez43PReek7eab3UoL9L54hg3v46cavV7DKJlJiynFMOfcq2DWt-UGzm3ralR84FhgQGZxIUA"});

  getToken(messaging, { vapidKey: 'BJ5HwScF1VWJ6eRez43PReek7eab3UoL9L54hg3v46cavV7DKJlJiynFMOfcq2DWt-UGzm3ralR84FhgQGZxIUA' }).then((currentToken) => {
    if (currentToken) {
      console.log(currentToken)
      // ...
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });

  requestPermission()

const analytics = getAnalytics(firebaseApp)

// used for the firestore refs
export const db = getFirestore(firebaseApp)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueFire, {
    firebaseApp,
    modules: [
        VueFireAuth()
    ]
})

app.mount('#app')
