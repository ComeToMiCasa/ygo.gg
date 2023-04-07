import React, { useEffect, useState } from "react"
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { Link } from "react-router-dom"
import db from "../src/db"
import "../styles/home.css"
import DeckRankingContainer from "../components/deckRankingContainer"

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
			limit(8)
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
				{/* <HomeButton name="전적 검색" link="/match-search"/> */}
				<HomeButton name="승률 통계" link="/preparing"/>
				<HomeButton name="티어 분석" link="/preparing"/>
				<HomeButton name="강의 노트" link="/preparing"/>
				<div style={{width: 220}}>
					<Link to="/match">
						<div className="StartButton">
                    전적 등록하기
						</div>
					</Link>
				</div>
			</div>
			<DeckRankingContainer decks={matchDecks}/>
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
