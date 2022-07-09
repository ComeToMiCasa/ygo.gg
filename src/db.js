import app from "./firebase.js";
import { getFirestore } from "firebase/firestore";

export default getFirestore(app);
