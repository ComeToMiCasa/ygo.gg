import functions from "firebase-functions";
import admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

export const onMatchCreate = functions.firestore
    .document("Users/{userId}/Matches/{matchId}")
    .onCreate(async (snap, context) => {
        const { deck1, deck2, games, matchWin, comment } = snap.data();

        const myDeckDoc = db.collection("Decks").doc(deck1);
        const yourDeckDoc = db.collection("Decks").doc(deck2);

        const myDeckData = (await myDeckDoc.get()).data();
        const yourDeckData = (await yourDeckDoc.get()).data();

        const wins = games.reduce((count, val) => count + (val.win ? 1 : 0), 0);
        const losses = games.reduce(
            (count, val) => count + (val.win ? 0 : 1),
            0
        );

        const newMyDeckData = {
            gameTotal: myDeckData.gameTotal + wins + losses,
            gameWin: myDeckData.gameWin + wins,
            gameWinRate:
                (myDeckData.gameWin + wins) /
                (myDeckData.gameTotal + wins + losses),
            matchTotal: myDeckData.matchTotal + 1,
            matchWin: myDeckData.matchWin + (matchWin ? 1 : 0),
            matchWinRate:
                (myDeckData.matchWin + (matchWin ? 1 : 0)) /
                (myDeckData.matchTotal + 1),
        };

        const newYourDeckData = {
            gameTotal: yourDeckData.gameTotal + wins + losses,
            gameWin: yourDeckData.gameWin + losses,
            gameWinRate:
                (yourDeckData.gameWin + losses) /
                (yourDeckData.gameTotal + wins + losses),
            matchTotal: yourDeckData.matchTotal + 1,
            matchWin: yourDeckData.matchWin + (matchWin ? 0 : 1),
            matchWinRate:
                (yourDeckData.matchWin + (matchWin ? 0 : 1)) /
                (yourDeckData.matchTotal + 1),
        };

        return Promise.all([
            myDeckDoc.update(newMyDeckData),
            yourDeckDoc.update(newYourDeckData),
        ]);
    });
