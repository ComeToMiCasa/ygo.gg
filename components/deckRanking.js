import React from "react"
import { useEffect } from "react"
import "../styles/home.css"

const DeckRanking = ({ name, decks }) => {

	useEffect(() => {
		console.log(decks)
	}, [decks])

	const deckEntryList = decks.map((deckInfo, index) => (
		<DeckEntry {...deckInfo} key={index} />
	))

	return (
		<div className="DeckEntryContainer">
			{deckEntryList}
		</div>
	)
}

const DeckEntry = ({ name, winRate }) => (
	<div className="DeckEntry">
		{name}
		<div>
			{(winRate * 100).toFixed(1) + "%"}
		</div>
	</div>
)

export default DeckRanking