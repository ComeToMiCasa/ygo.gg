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
		let q = query(
			matchRef,
			where("deck1", "==", myDeck), 
			where("deck2", "==", yourDeck), 
		)
		if(!myDeck && !yourDeck) {
			q = query(matchRef)
		} else if(!myDeck) {
			q = query(
				matchRef,
				where("deck2", "==", yourDeck), 
			)
		} else if(!yourDeck) {
			q = query(
				matchRef,
				where("deck1", "==", myDeck), 
			)
		}
		getDocs(q) 
			.then((querySnapshot) => {
				setMatches(
					querySnapshot.docs.map((docSnapshot) => {
						const { deck1, deck2, games, matchWin } = docSnapshot.data()
						return {
							deck1, 
							deck2, 
							games,
							matchWin
						}
					})
				)
			})
	}

	const matchList = matches.map((matchData, index) => (
		<MatchEntry {...matchData} key={index}/>
	))

	return (
		<div style={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			marginTop: 80
		}}>
			<SearchBar 
				setMyDeck={setMyDeck} 
				setYourDeck={setYourDeck} 
				onSubmit={handleSubmit}
			/>
			<div>
				{matchList}
			</div>
		</div>
	)
}

const MatchEntry = ({deck1, deck2, games, matchWin}) => {
	const gamesList = games.reduce((str, val) => str + (val ? "O" : "X"), "")

	return (
		<div style={{
			width: 1000,
			height: 50,
			borderBottom: "solid black .5px",
			backgroundColor: "white",
		}}>
			{deck1.name} {deck2.name} {gamesList} {matchWin ? "승" : "패"}
		</div>
	)
}

export default MatchPage