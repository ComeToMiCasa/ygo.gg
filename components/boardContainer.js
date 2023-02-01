import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const BoardContainer = ({ selectedBoard, boards, onBoardSelect }) => {
    
	const boardList = boards.map(({ id, name }) => (
		<BoardEntry id={id} name={name} onSelect={onBoardSelect} isSelected={selectedBoard && selectedBoard.id == id} key={id}/>
	))

	const navigate = useNavigate()

	return (
		<div style={{
			display: "flex",
			flexDirection: "row",
			// backgroundColor: "rgb(240, 237, 204)",
			borderBottom: "solid 3px rgb(2, 52, 63)",
			padding: 10,
			justifyContent: "space-between"
		}}>
			<div style={{
				display: "flex",
				flexDirection: "row"
			}}>
				{boardList}
			</div>
			<div
				onClick={()=>navigate("../newpost")}
			>
				글쓰기
			</div>
		</div>
	)
}

const BoardEntry = ({ id, name, onSelect, isSelected }) => {
	const [isHover, setIsHover] = useState(false)

	return (
		<div 
			onClick={() => onSelect({ id, name })}
			style={{
				marginRight: 10,
				textDecorationLine: isHover ? "underline" : "none",
				textDecorationThickness: 1,
				cursor: "pointer"
			}}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			{isSelected ? (
				<b>
					{name + "게시판"}
				</b>
			) : name + "게시판"}
			
		</div>
	)
}

export default BoardContainer