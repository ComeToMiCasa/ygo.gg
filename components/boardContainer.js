import React, { useState } from "react"

const BoardContainer = ({ selectedBoard, boards, onBoardSelect }) => {
    
	const boardList = boards.map(({ id, name }) => (
		<BoardEntry id={id} name={name} onSelect={onBoardSelect} isSelected={selectedBoard && selectedBoard.id == id} key={id}/>
	))

	return (
		<div style={{
			display: "flex",
			flexDirection: "row",
			// backgroundColor: "rgb(240, 237, 204)",
			borderBottom: "solid 3px rgb(2, 52, 63)",
			padding: 10
		}}>
			{boardList}
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