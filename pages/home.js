import React, { useContext } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import auth, { googleProvider } from "../src/auth";
import { userContext } from "../src/context";

const Home = () => {
    const { uid } = useContext(userContext);

    const handleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                const user = res.user;
                console.log(user.uid);
            })
            .catch((e) => console.error(e));
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => console.log("sign out success"))
            .catch((e) => console.error(e));
    };

    return (
        <div>
            <button onClick={handleSignIn}>sign in with google</button>
            <button onClick={handleSignOut}>sign out</button>
            {uid}
        </div>
    );
};

export default Home;
