import React from "react"
import DeckRanking from "./deckRanking"
import "../styles/home.css"
import { useState } from "react"

const DeckRankingContainer = ({ decks }) => {

	const [selected, setSelected] = useState(0)

	return (
		<div className="DeckRankingContainer">
			<DeckRanking decks={decks} />
			<Selector 
				names={["최고 승률 덱", "입상 덱 분포"]} 
				selected={selected} 
				onSelect={() => setSelected(1-selected)}/>
		</div>
	)
}

const Selector = ({ names, selected, onSelect }) => {
	return (
		<div 
			className="SelectorEntryContainer"
		>
			<div 
				className="SelectorEntryRight"
				// onClick={onSelect}
				style={{
					fontWeight: selected ? "bold" : "normal",
					color: selected ? "#2F5DFF" : "black"
				}}
			>
				{names[1]}
			</div>
			<div 
				className="SelectorEntryLeft"
				onClick={onSelect}
				style={{
					fontWeight: !selected ? "bold" : "normal",
					color: !selected ? "#2F5DFF" : "black"
				}}
			>
				{names[0]}
			</div>
			<div 
				className={!selected ? "SelectorSelectorLeft" : "SelectorSelectorRight"}
			>        
			</div>
		</div>
	)
}

export default DeckRankingContainer