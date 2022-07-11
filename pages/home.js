import React, { useContext, useEffect } from "react";
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
} from "firebase/auth";
import auth, { googleProvider } from "../src/auth";
import { userContext } from "../src/context";

const Home = () => {
    const { username, setUsername, uid, setUid } = useContext(userContext);

    const handleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                const credential = GoogleAuthProvider.credentialFromResult(res);
                const user = res.user;
                console.log(user.uid);
            })
            .catch((e) => console.error(e));
    };

    return (
        <div>
            <button onClick={handleSignIn}>sign in with google</button>
            {uid}
        </div>
    );
};

export default Home;
