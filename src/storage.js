import { getStorage } from "firebase/storage"
import app from "./firebase.js"

const storage = getStorage(app)

export default storage
