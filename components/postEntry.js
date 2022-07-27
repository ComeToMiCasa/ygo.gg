import React from "react"
import { useNavigate } from "react-router-dom"
import { processDate } from "../utils"
import "../styles/post.css"

const PostEntry = ({ id, title, board, user, timeStamp }) => {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate("../post", { state: { id, board } })
	}

	return (
		<div 
			className="PostEntry"
			onClick={handleClick}
		> 
			<div className="PostEntryComponent">
				{board.label}
			</div>
			<div className="PostEntryComponent">
				{title}
			</div>
			<div className="PostEntryComponent">
				{user.username}
			</div>
			<div className="PostEntryComponent">
				{processDate(timeStamp)}
			</div>
		</div>
	)
}

export default PostEntry