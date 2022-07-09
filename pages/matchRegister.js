import React, { useEffect, useState } from "react";
import db from "../src/db";
import { addDoc, collection, getDocs } from "firebase/firestore";
import DeckSelector from "../components/deckSelector";
import GameSelector from "../components/gameSelector";
import MatchComment from "../components/matchComment";

const MatchRegister = () => {
    const ref = collection(db, "Decks");
    const [decks, setDecks] = useState([]);

    const [myDeck, setMyDeck] = useState(null);
    const [yourDeck, setYourDeck] = useState(null);

    const [matchWin, setMatchWin] = useState(true);
    const [game1Win, setGame1Win] = useState(true);
    const [game2Win, setGame2Win] = useState(true);
    const [game3Win, setGame3Win] = useState(true);

    const [game1First, setGame1First] = useState(true);
    const [game2First, setGame2First] = useState(true);
    const [game3First, setGame3First] = useState(true);

    const [isInvalid, setIsInvalid] = useState(false);
    const [comment, setComment] = useState("");

    useEffect(() => {
        setMatchWin(
            (game1Win && game2Win) ||
                (game1Win && game3Win) ||
                (game2Win && game3Win)
        );
    }, [game1Win, game2Win, game3Win]);

    useEffect(() => {
        setIsInvalid((game1Win && game2Win) || (!game1Win && !game2Win));
    }, [game1Win, game2Win, game3Win]);

    useEffect(() => {
        getDocs(ref).then((res) => {
            setDecks(
                res.docs.map((docSnapshot) => {
                    const data = docSnapshot.data();
                    return {
                        label: data.name,
                        value: docSnapshot.id,
                    };
                })
            );
        });
    }, []);

    return (
        <div
            style={{
                width: 520,
                borderWidth: 2,
                borderColor: "black",
                borderStyle: "solid",
                padding: 20,
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 100,
            }}
        >
            <b>전적 등록</b>
            <br />
            <br />
            <DeckSelector
                decks={decks}
                setMyDeck={setMyDeck}
                setYourDeck={setYourDeck}
            />
            <br />
            <GameSelector
                label={"1세트"}
                isWin={game1Win}
                isFirst={game1First}
                setIsWin={setGame1Win}
                setIsFirst={setGame1First}
                isInValid={false}
            />
            <GameSelector
                label={"2세트"}
                isWin={game2Win}
                isFirst={game2First}
                setIsWin={setGame2Win}
                setIsFirst={setGame2First}
                isInValid={false}
            />
            <GameSelector
                label={"3세트"}
                isWin={game3Win}
                isFirst={game3First}
                setIsWin={setGame3Win}
                setIsFirst={setGame3First}
                isInValid={isInvalid}
            />
            <br />
            {matchWin ? "매치 승" : "매치 패"}
            <br />
            <br />
            <MatchComment
                comment={comment}
                handleChange={(e) => setComment(e.value)}
            />
            <button>등록</button>
        </div>
    );
};

export default MatchRegister;
