import React from "react"

const MatchComment = ({ comment, handleChange }) => (
	<div>
        [비고]
		<br />
		<textarea
			style={{ width: 510, height: 150, fontSize: 16, resize: "none" }}
			value={comment}
			onChange={handleChange}
		></textarea>
	</div>
)

export default MatchComment
