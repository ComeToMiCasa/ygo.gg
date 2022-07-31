import React from "react"
import { Link, useNavigate } from "react-router-dom"
import arrow from "../public/images/right-arrow.png"
import "../styles/home.css"

const DeckRanking = ({name, decks}) => {

	const deckEntryList = decks.map((deckInfo, index) => 
		<DeckEntry {...deckInfo} key={index}/>
	)

	const navigate = useNavigate()

	return (
		<div style={{
			width: 500, 
			height: 600,
			backgroundColor: "white",
			display: "flex",
			flexDirection: "column",
			boxShadow: "2px 2px 2px gray",
		}}>
			<div style={{
				height: 40,
				display: "grid",
				gridTemplateColumns: "1fr 8fr 1fr",
				backgroundColor: "#F0EDCC",
				fontSize: 18,
				color: "black",
			}}>
				<div style={{
					gridColumn: "2 / 3",
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				}}>
					{name}
				</div>
				<div style={{
					gridColumn: "3 / 4",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}>
					<Link to="/match-search">
						<img src={arrow} width={25} color="white"/>
					</Link>
					
				</div>
			</div>
			{deckEntryList}
			<div className="MatchRegisterButtonContainer">
				<div 
					className="MatchRegisterButton"
					onClick={() => {
						navigate("/match")
					}}
				>
					<div>
						전적 등록하기
					</div>
				</div>
			</div>
		</div>
	)
}

const DeckEntry = ({name, winRate}) => (
	<div style={{
		display: "flex",
		justifyContent: "space-between",
		height: 50,
		borderTop: "solid .5px gray",
		paddingLeft: 10,
		// paddingRight: 10,
		fontFamily: "Nanum Gothic",
		fontSize: 18
	}}>
		<div style={{
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		}}>
			{name}
		</div> 
		<div style={{
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			// backgroundColor: "#02343F",
			width: 70
		}}>
			{(winRate * 100).toFixed(1) + "%"}
		</div>
	</div>
)

export default DeckRanking