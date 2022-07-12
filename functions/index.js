import functions from "firebase-functions";
import admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

export const onMatchCreate = functions.firestore
    .document("Users/{userId}/Matches/{matchId}")
    .onCreate((snap, context) => {
        const { deck1, deck2, games, matchWin, comment } = snap.data();
        console.log(typeof deck1);
        console.log(deck1);
    });
