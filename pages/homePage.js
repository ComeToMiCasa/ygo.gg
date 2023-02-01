import React, { useEffect, useState } from "react"
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { Link } from "react-router-dom"
import db from "../src/db"
import DeckRanking from "../components/deckRanking"
import HotPostContainer from "../components/hotPostContainer"
import "../styles/home.css"

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
		<div>
			<div className="HomeButtonContainer">
				<HomeButton name="전적 검색" link="/match-search"/>
				<HomeButton name="승률 통계" link="/preparing"/>
				<HomeButton name="티어 분석" link="/preparing"/>
				<div style={{width: 220}}>
					<Link to="/match">
						<div className="StartButton">
                    지금 시작하기
						</div>
					</Link>
				</div>
			</div>
			<div className="RankingContainer">
				<DeckRanking name="OCG 티어 덱" decks={matchDecks}/>
			</div>
		</div>
	)
}

const HomeButton = ({ name, link }) => {

	return (
		<div className="HomeButton">
			<Link to={link}>
				{name}
			</Link>
		</div>
	)
}

export default Home
