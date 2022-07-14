import React from "react"
import Select from "react-select"

const DeckSelector = ({ decks, deck1, deck2, setDeck1, setDeck2 }) => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			<DeckDropdown decks={decks} name={"내 덱"} onSelect={setDeck1} value={deck1}/>
			<DeckDropdown decks={decks} name={"상대 덱"} onSelect={setDeck2} value={deck2}/>
		</div>
	)
}

const DeckDropdown = ({ decks, name, onSelect}) => (
	<div style={{ width: 230 }}>
		{name}
		<Select
			options={decks}
			onChange={(newValue) => onSelect(newValue.value)}
			placeholder="덱 검색"
		/>
	</div>
)

export default DeckSelector
