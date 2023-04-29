import React, { useContext, useEffect, useState } from "react"
import { Timestamp, collection, collectionGroup, getDocs, orderBy, query } from "firebase/firestore"
import { useLocation, useNavigate } from "react-router-dom"
import PostContainer from "../components/postContainer"
import { boardContext } from "../src/context"
import db from "../src/db"
import { limit } from "firebase/firestore"
import "../styles/board.css"
import usePostFetch from "../hooks/usePostFetch"
import { processDate } from "../utils"

const BoardPage = () => {
	const { boards } = useContext(boardContext)
	const [board, setBoard] = useState(null)
	const [page, setPage] = useState(0)
	const { isLoading, error, posts } = usePostFetch(page)
	const [boardContainerList, setBoardContainerList] = useState([])

	const { state } = useLocation()
	const boardParam = state?.boardParam

	useEffect(() => {setBoard(boardParam)}, [])

	const dummyEntry = <BoardEntry isDummy={true} postInfo={undefined}/>
	

	useEffect(() => {
		let tmpList = []
		for (let i = 0; i < posts.length; i += 5) {
			let boardEntryList = posts?.slice(i, i + 5).map((x, i) => 
				<BoardEntry key={i} isDummy={false} postInfo={x} />
			)
			const len = boardEntryList.length
			if(len < 5) {
				for(let i = len; i < 5; i++) {
					boardEntryList.push(dummyEntry)
				}
			}
			tmpList.push(
				<div key={i} className="BoardHorizontalContainer">
					{boardEntryList}
				</div>
			)
		}
		setBoardContainerList(tmpList)
		console.log(posts)
	}, [posts])

	const navigate = useNavigate()

	return (
		<div className="BoardContainer">
			<div className="BoardHeaderBar">
				<div onClick={() => navigate("../newpost")}>
					글쓰기
				</div>
				<div onClick={() => setPage(page + 1)}>
					tmp
				</div>
			</div>

			{boardContainerList}
		</div>
	)
}

const BoardEntry = ({isDummy, postInfo}) => {

	const { id, timeStamp, title, user, thumbnail, board } = postInfo || {}
	const navigate = useNavigate()

	return(isDummy ? <div className="BoardEntry"/> : 
		<div 
			className="BoardEntry"
			onClick={() => navigate({
				pathname: "../post",
				search: `?id=${id}`
			})}
		>
			<div className="ThumbnailContainer">
				<img src={thumbnail} style={{objectFit: "cover", width: 305, height: 200}}></img>
			</div>
			<div className="PostTitle">
				<b>{title}</b>
			</div>
			<div className="Preview">
				lorem ipsum...
			</div>
			<div className="AdditionalInfo">
				{user.username}
				{processDate(timeStamp)}
			</div>
		</div>
	)
}

export default BoardPage