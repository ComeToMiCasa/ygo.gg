import { getAuth, GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth"
import app from "./firebase"

export default getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const twitterProvider = new TwitterAuthProvider()
