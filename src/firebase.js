// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

// if (location.hostname === "localhost") {
// 	firebaseConfig = {
// 		storageBucket: "http://localhost:4001/firestore",
// 		apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
// 		authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// 		projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// 		messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
// 		appId: process.env.REACT_APP_FIREBASE_APP_ID,
// 		measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// 	}
// }

// connectFirestoreEmulator(db, "localhost", 8080)
// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const auth = getAuth(app)

export default app
