import React, { useEffect, useState } from "react";
import db from "../src/db";
import { addDoc, collection, getDocs } from "firebase/firestore";

const DeckRegister = () => {
    const deckRef = collection(db, "Decks");
    const pendingRef = collection(db, "PendingDecks");

    const [decks, setDecks] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        getDocs(deckRef).then((res) => {
            setDecks(
                res.docs.map((docSnapshot) => {
                    const data = docSnapshot.data();
                    return {
                        name: data.name,
                        id: docSnapshot.id,
                    };
                })
            );
        });
    }, []);

    useEffect(() => console.log(decks), [decks]); //debug

    const handleSubmit = () => {
        addDoc(pendingRef, {
            name,
        })
            .then((docRef) => console.log(docRef.id))
            .catch((e) => console.error(e));
        setName("");
    };

    return (
        <div>
            [Deck Register]
            <br />
            <input
                placeholder="덱 이름을 입력하세요"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <button onClick={handleSubmit}>등록</button>
        </div>
    );
};

export default DeckRegister;
