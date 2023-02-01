import React, { useContext } from "react"
import Select from "react-select"
import { deckContext } from "../src/context"
import arrow from "../public/images/right-arrow.png"
import { Link } from "react-router-dom"

const SearchBar = ({setMyDeck, setYourDeck, onSubmit}) => {
	const {decks} = useContext(deckContext)

	const selectStyles = {
		control: (provided) =>({
			...provided,
			width: 250,
			height: 40,
			borderTop: "0px",
			borderBottom: "0px",
			// borderLeft: "0px",
			borderRadius: 0,
		})
	}

	return (
		<div style={{
			width: 900,
			height: 40,
			backgroundColor: "white",
			boxShadow: "2px 2px 2px gray",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			marginBottom: 50
		}}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
					width: 150,
					height: "100%",
					cursor: "pointer",
				}}>
				<Link to="/match" style={{ textDecoration: "none", color: "black" }}>
					<div style={{
						display: "flex", 
						alignItems: "center", 
						justifyContent: "space-around",
						width: 150
					}}>
						<img src={arrow} width={20} style={{transform: "rotate(180deg)"}}/>
						전적 등록하기
					</div>
				</Link>
			</div>
			<Select
				options={decks}
				placeholder="내 덱 검색하기"
				styles={selectStyles}
				onChange={(newValue) => 
					setMyDeck({name: newValue.label, id: newValue.value})
				}
			/>
			<Select
				options={decks}
				placeholder="상대 덱 검색하기"
				styles={selectStyles}
				onChange={(newValue) => 
					setYourDeck({name: newValue.label, id: newValue.value})
				}
			/>
			<div 
				onClick={onSubmit} 
				style={{
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
					width: 150,
					height: "100%",
					cursor: "pointer",
				}}>
				전적 검색하기 
				<img src={arrow} width={20}/>
			</div>
		</div>
	)
}

export default SearchBar