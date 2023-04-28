import React, { useContext, useEffect, useState } from "react"
import { collection, collectionGroup, getDocs, orderBy, query } from "firebase/firestore"
import { useLocation, useNavigate } from "react-router-dom"
import PostContainer from "../components/postContainer"
import { boardContext } from "../src/context"
import db from "../src/db"
import { limit } from "firebase/firestore"
import "../styles/board.css"
import usePostFetch from "../hooks/usePostFetch"

const BoardPage = () => {
	const { boards } = useContext(boardContext)
	const [board, setBoard] = useState(null)
	const [page, setPage] = useState(0)
	const { isLoading, error, posts } = usePostFetch(page)
	const [boardContainerList, setBoardContainerList] = useState([])

	const { state } = useLocation()
	const boardParam = state?.boardParam

	useEffect(() => {setBoard(boardParam)}, [])

	const dummyList = Array.apply(null, Array(5)).map((_, i) => <BoardEntry key={i} isDummy={true} postInfo={undefined}/>)
	

	useEffect(() => {
		let tmpList = []
		for (let i = 0; i < posts.length; i += 5) {
			console.log("test")
			const boardEntryList = posts?.slice(i, i + 5).map((x, i) => <BoardEntry key={i} isDummy={false} postInfo={x} />)
			tmpList.push(
				<div key={i} className="BoardHorizontalContainer">
					{boardEntryList}
				</div>
			)
		}
		setBoardContainerList(tmpList)
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

	const { timeStamp, title, user, thumbnail } = postInfo || {}

	return(isDummy ? <div className="BoardEntry"/> : 
		<div className="BoardEntry">
			<div className="ThumbnailContainer">
				<img src={thumbnail} style={{objectFit: "fill", width: 270}}></img>
			</div>
			{title}
		</div>
	)
}

export default BoardPage