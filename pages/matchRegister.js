import React, { useContext, useEffect, useState } from "react"
import db from "../src/db"
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import DeckSelector from "../components/deckSelector"
import GameSelector from "../components/gameSelector"
import MatchComment from "../components/matchComment"
import { userContext } from "../src/context"

const MatchRegister = () => {
	const { uid } = useContext(userContext)

	const deckRef = collection(db, "Decks")

	const [decks, setDecks] = useState([])

	const [deck1, setDeck1] = useState(null)
	const [deck2, setDeck2] = useState(null)

	const [matchWin, setMatchWin] = useState(true)
	const [game1Win, setGame1Win] = useState(true)
	const [game2Win, setGame2Win] = useState(true)
	const [game3Win, setGame3Win] = useState(true)

	const [game1First, setGame1First] = useState(true)
	const [game2First, setGame2First] = useState(true)
	const [game3First, setGame3First] = useState(true)

	const [isInvalid, setIsInvalid] = useState(true)
	const [comment, setComment] = useState("")

	const handleSubmit = async () => {
		if (!deck1 || !deck2) {
			alert("덱을 선택하세요")
			return
		}
		if (!uid) {
			alert("로그인하세요")
			return
		}
		const games = isInvalid
			? [
				{ win: game1Win, first: game1First },
				{ win: game2Win, first: game2First },
			]
			: [
				{ win: game1Win, first: game1First },
				{ win: game2Win, first: game2First },
				{ win: game3Win, first: game3First },
			]

		addDoc(collection(db, "Users/" + uid + "/Matches"), {
			deck1: deck1,
			deck2: deck2,
			games,
			matchWin,
			comment,
		})
			.then((docRef) => console.log(docRef.id))
			.catch((e) => console.error(e))

		const myDeckDoc = doc(db, "Decks/" + deck1)
		const yourDeckDoc = doc(db, "Decks/" + deck2)

		const myDeckData = (await getDoc(myDeckDoc)).data()
		const yourDeckData = (await getDoc(yourDeckDoc)).data()

		const wins = games.reduce((count, val) => count + (val.win ? 1 : 0), 0)
		const losses = games.reduce(
			(count, val) => count + (val.win ? 0 : 1),
			0
		)

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
		}
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
		}

		updateDoc(myDeckDoc, newMyDeckData)
			.then(() => console.log("update success"))
			.catch((e) => console.error(e))
		updateDoc(yourDeckDoc, newYourDeckData)
			.then(() => console.log("update success"))
			.catch((e) => console.error(e))

		setDeck1(null)
		setDeck2(null)
		setGame1Win(true)
		setGame2Win(true)
		setGame3Win(true)
		setGame1First(true)
		setGame2First(true)
		setGame3First(true)
		setComment("")
	}

	useEffect(() => {
		setMatchWin(
			(game1Win && game2Win) ||
                (game1Win && game3Win) ||
                (game2Win && game3Win)
		)
	}, [game1Win, game2Win, game3Win])

	useEffect(() => {
		setIsInvalid((game1Win && game2Win) || (!game1Win && !game2Win))
	}, [game1Win, game2Win, game3Win])

	useEffect(() => {
		getDocs(deckRef).then((res) => {
			setDecks(
				res.docs.map((docSnapshot) => {
					const data = docSnapshot.data()
					return {
						label: data.name,
						value: docSnapshot.id,
					}
				})
			)
		})
	}, [])

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
				deck1={deck1}
				deck2={deck2}
				setDeck1={setDeck1}
				setDeck2={setDeck2}
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
				handleChange={(e) => setComment(e.target.value)}
			/>
			<button onClick={handleSubmit}>등록</button>
		</div>
	)
}

export default MatchRegister
