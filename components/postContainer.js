import React from "react"

const PostContainer = ({ boards, onBoardSelect, posts }) => {
    
	const postList = posts.map(({ id, title }) => (
		<div key={id} >
			{title}
		</div>
	))


	return (
		<div>
			<BoardContainer boards={boards} onBoardSelect={onBoardSelect} />
			{postList}
		</div>
	)
}

const BoardContainer = ({ boards, onBoardSelect }) => {
    
	const boardList = boards.map(({ id, name }) => (
		<div key={id}>
			<button onClick={() => onBoardSelect({ id, name })}>
				{name}
			</button>
		</div>
	))

	return (
		<div>
			{boardList}
		</div>
	)
}

export default PostContainer