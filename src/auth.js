import { getAuth, GoogleAuthProvider } from "firebase/auth"
import app from "./firebase"

export default getAuth(app)
export const googleProvider = new GoogleAuthProvider()
