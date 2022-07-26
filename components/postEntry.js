import React from "react"
import { processDate } from "../utils"
import "../styles/post.css"

const PostEntry = ({ title, board, user, timeStamp }) => {
	return (
		<div 
			className="PostEntry"
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