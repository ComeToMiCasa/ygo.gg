// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ--cvOdkdVIuLTGIPc48N66hUoPSqMT0",
  authDomain: "ygo-gg.firebaseapp.com",
  projectId: "ygo-gg",
  storageBucket: "ygo-gg.appspot.com",
  messagingSenderId: "528752419550",
  appId: "1:528752419550:web:f794667b85c45b895e584f",
  measurementId: "G-Y4R9NCL2W1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
