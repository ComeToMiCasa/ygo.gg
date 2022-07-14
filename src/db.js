import app from "./firebase.js"
import { getFirestore } from "firebase/firestore"

const db = getFirestore(app)

// connectFirestoreEmulator(db, "localhost", 8080)
export default db
