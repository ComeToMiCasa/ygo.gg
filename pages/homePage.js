import React, { useEffect, useState } from "react"
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import db from "../src/db"
import DeckRanking from "../components/deckRanking"
import HotPostContainer from "../components/hotPostContainer"

function Home() {
	// eslint-disable-next-line no-unused-vars
	const [gameDecks, setGameDecks] = useState([])
	const [matchDecks, setMatchDecks] = useState([])

	const deckRef = collection(db, "Decks")

	useEffect(() => {
		const gameQuery = query(
			deckRef,
			orderBy("gameWinRate", "desc"),
			limit(10)
		)
		const matchQuery = query(
			deckRef,
			orderBy("matchWinRate", "desc"),
			limit(10)
		)
		Promise.all([getDocs(gameQuery), getDocs(matchQuery)])
			.then(
				(querySnapshots) => {
					const gameSnapshot = querySnapshots[0]
					const matchSnapshot = querySnapshots[1]

					setGameDecks(
						gameSnapshot.docs.map((docSnapshot) => ({
							name: docSnapshot.data().name,
							winRate: docSnapshot.data().gameWinRate,
						}))
					)
					setMatchDecks(
						matchSnapshot.docs.map((docSnapshot) => ({
							name: docSnapshot.data().name,
							winRate: docSnapshot.data().matchWinRate,
						}))
					)
				}
			)
			.catch((e) => console.error(e))
	}, [])

	return (
		<div style={{
			display: "flex", 
			width: 1300, 
			marginLeft: "auto",
			marginRight: "auto",
			marginTop: "2%",
			justifyContent: "space-between",
		}}>
			<div style={{
				height: 650,
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-around",
				alignItems: "center"
			}}>
				<DeckRanking name="OCG 티어 덱" decks={matchDecks}/>
			</div>
			<HotPostContainer/>
		</div>
	)
}

export default Home
