import React from "react"
import BoardContainer from "./boardContainer"
import PostEntry from "./postEntry"
import "../styles/post.css"

const PostContainer = ({ selectedBoard, boards, onBoardSelect, posts }) => {
    
	const postList = posts.map(({ id, title, board, user, timeStamp }) => (
		<PostEntry key={id} id={id} title={title} board={board} user={user} timeStamp={timeStamp}/>
	))

	return (
		<div style={{
			width: "70%",
			marginLeft: "auto",
			marginRight: "auto",
			marginTop: "2%"
		}}>
			<BoardContainer selectedBoard={selectedBoard} boards={boards} onBoardSelect={onBoardSelect} />
			<div style={{
				display: "flex",
				flexDirection: "column",
				height: 630
			}}>
				<div className="PostLegend">
					<div className="PostEntryComponent">
						게시판
					</div>
					<div className="PostEntryComponent">
						제목
					</div>
					<div className="PostEntryComponent">
						작성자
					</div>
					<div className="PostEntryComponent">
						작성시간
					</div>
				</div>
				{postList}
			</div>
		</div>
	)
}

export default PostContainer