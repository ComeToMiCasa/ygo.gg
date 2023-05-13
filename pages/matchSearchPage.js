import { collection, getDocs, query, where } from "firebase/firestore"
import React, { useState } from "react"
import SearchBar from "../components/searchBar"
import db from "../src/db"

const MatchPage = () => {
	const [myDeck, setMyDeck] = useState(null)
	const [yourDeck, setYourDeck] = useState(null)
	const [matches, setMatches] = useState([])

	const matchRef = collection(db, "Matches")

	const handleSubmit = () => {
		let q1 = query(
			matchRef,
			where("deck1", "==", myDeck), 
			where("deck2", "==", yourDeck), 
		)
		let q2 = query(
			matchRef, 
			where("deck1", "==", yourDeck),
			where("deck2", "==", myDeck)
		)
		if(!myDeck && !yourDeck) {
			q1 = query(matchRef)
			q2 = query(matchRef, where("deck1", "==", "null"))
		} else if(!myDeck) {
			q1 = query(
				matchRef,
				where("deck2", "==", yourDeck), 
			)
			q2 = query(
				matchRef,
				where("deck1","==", yourDeck)
			)
		} else if(!yourDeck) {
			q1 = query(
				matchRef,
				where("deck1", "==", myDeck), 
			)
			q2 = query(
				matchRef,
				where("deck2", "==", myDeck), 
			)
		}
		Promise.all([getDocs(q1), getDocs(q2)])
			.then((querySnapshots) => {
				const querySnapshot1 = querySnapshots[0]
				const querySnapshot2 = querySnapshots[1]
				setMatches(
					querySnapshot1.docs.map((docSnapshot) => {
						const { deck1, deck2, games, matchWin } = docSnapshot.data()
						console.log(games)
						return {
							deck1, 
							deck2, 
							games,
							matchWin
						}
					}).concat(
						querySnapshot2.docs.map((docSnapshot) => {
							const { deck1, deck2, games, matchWin } = docSnapshot.data()
							return {
								deck1: deck2, 
								deck2: deck1, 
								games: games.map(({win, first}) => ({win: !win, first})),
								matchWin: !matchWin
							}
						})
					)
				)
			})
			.catch((e) => console.error(e))
	}

	const matchList = matches.map((matchData, index) => (
		<MatchEntry {...matchData} key={index}/>
	))

	return (
		<div style={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			marginTop: 60
		}}>
			<SearchBar 
				setMyDeck={setMyDeck} 
				setYourDeck={setYourDeck} 
				onSubmit={handleSubmit}
			/>
			{matches.length ? (
				<div className="MatchListContainer">
					{matchList}
				</div>) : (
				<div style={{
					fontSize: 18,
					textAlign: "center",
					marginTop: 100
				}}>
					덱을 선택하고 전적을 검색하세요. 덱을 선택하지 않으면 모든 덱을 기반으로 검색합니다.
					<br/>
					<br/>
					TIP) 덱을 한쪽만 선택하고 검색해보세요.
					
				</div>
			)
			}
		</div>
	)
}

const MatchEntry = ({deck1, deck2, games, matchWin}) => {
	const gamesList = (
		<div style={{
			width: 100,
		}}>
			{games.reduce((str, val) => str + (val.win ? "O" : "X"), "")}
		</div>
	)

	return (
		<div className="MatchEntry">
			친선전
			<DeckComponent {...deck1}/>
			vs
			<DeckComponent {...deck2}/>
			{gamesList} 
			<div>
				매치 <b>{matchWin ? "승" : "패"}</b>
			</div>
		</div>
	)
}

const DeckComponent = ({name}) => {
	return (
		<div style={{
			width: 170,
		}}>
			{name}
		</div>
	)
}

export default MatchPage