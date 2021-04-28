// Take ALL named exports from firebase onto a firebase object
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD1Tul8CaP01lDWykp5OmmJlBFt8gNVLLk",
  authDomain: "expensify-775dd.firebaseapp.com",
  databaseURL: "https://expensify-775dd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "expensify-775dd",
  storageBucket: "expensify-775dd.appspot.com",
  messagingSenderId: "844106346633",
  appId: "1:844106346633:web:c3826e10096dc9ad535658",
  measurementId: "G-JCHQWJ8JSP"
}

firebase.initializeApp(firebaseConfig);

firebase.database().ref().set({
  name: `Paul Hudson`
})
