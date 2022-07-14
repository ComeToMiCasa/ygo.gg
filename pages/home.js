import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import db from "../src/db";

const Home = () => {
    const [gameDecks, setGameDecks] = useState([]);
    const [matchDecks, setMatchDecks] = useState([]);

    const deckRef = collection(db, "Decks");

    useEffect(() => {
        const gameQuery = query(
            deckRef,
            orderBy("gameWinRate", "desc"),
            limit(10)
        );
        const matchQuery = query(
            deckRef,
            orderBy("matchWinRate", "desc"),
            limit(10)
        );
        Promise.all([getDocs(gameQuery), getDocs(matchQuery)]).then(
            (querySnapshots) => {
                const gameSnapshot = querySnapshots[0];
                const matchSnapshot = querySnapshots[1];

                setGameDecks(
                    gameSnapshot.docs.map((docSnapshot) => ({
                        name: docSnapshot.data().name,
                        winRate: docSnapshot.data().gameWinRate,
                    }))
                );
                setMatchDecks(
                    matchSnapshot.docs.map((docSnapshot) => ({
                        name: docSnapshot.data().name,
                        winRate: docSnapshot.data().matchWinRate,
                    }))
                );
            }
        );
    }, []);

    const gameDeckList = gameDecks.map(({ name, winRate }, index) => (
        <div key={index}>
            {name} {winRate}
        </div>
    ));

    const matchDeckList = matchDecks.map(({ name, winRate }, index) => (
        <div key={index}>
            {name} {winRate}
        </div>
    ));

    return (
        <div>
            {gameDeckList}
            <br />
            {matchDeckList}
        </div>
    );
};

export default Home;
