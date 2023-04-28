import React, { useContext, useEffect, useState } from "react"
import { collection, collectionGroup, getDocs, orderBy, query } from "firebase/firestore"
import { useLocation, useNavigate } from "react-router-dom"
import PostContainer from "../components/postContainer"
import { boardContext } from "../src/context"
import db from "../src/db"
import { limit } from "firebase/firestore"
import "../styles/board.css"

const BoardPage = () => {
	const { boards } = useContext(boardContext)
	const [board, setBoard] = useState(null)
	const [posts, setPosts] = useState(null)
	const [postCnt, setPostCnt] = useState(null)
	const [isPostLoaded, setIsPostLoaded] = useState(false)

	const { state } = useLocation()
	const boardParam = state?.boardParam

	useEffect(() => {setBoard(boardParam)}, [])

	useEffect(() => {
		if(!board) {
			getDocs(query(collectionGroup(db , "Posts"), orderBy("timeStamp", "desc"), limit(10)))
				.then((querySnapshot) => {
					setPosts(
						querySnapshot.docs.map((docSnapshot) => {
							const { user, title, board, timeStamp, thumbnail } = docSnapshot.data()
							return {
								id: docSnapshot.id,
								timeStamp: timeStamp.toDate(),
								board,
								title,
								user,
								thumbnail
							}
						})
					)
				})
		} else {
			getDocs(query(collection(db, `Boards/${board.id}/Posts`), orderBy("timeStamp", "desc"), limit(10)))
				.then((querySnapshot) => {
					setPosts(
						querySnapshot.docs.map((docSnapshot) => {
							const { user, title, board, timeStamp, thumbnail } = docSnapshot.data()
							return {
								id: docSnapshot.id,
								timeStamp: timeStamp.toDate(),
								board,
								title,
								user,
								thumbnail
							}
						})
					)
				})
		}
	}, [board])

	useEffect(() => {
		if(posts != null) {
			console.log(posts)
			setIsPostLoaded(true)
		}
	}, [posts])

	const dummyList = Array.apply(null, Array(5)).map(_ => <BoardEntry isDummy={true} postInfo={undefined}/>)

	const firstList = posts?.slice(0, 5).map(x => <BoardEntry isDummy={false} postInfo={x} />)
	const secondList = posts?.slice(5).map(x => <BoardEntry isDummy={false} postInfo={x} />)

	const navigate = useNavigate()

	return (
		<div className="BoardContainer">
			<div className="BoardHeaderBar">
				<div onClick={() => navigate("../newpost")}>
					글쓰기
				</div>
			</div>
			<div className="BoardHorizontalContainer">
				{isPostLoaded ? firstList : dummyList}
			</div>
			<div className="BoardHorizontalContainer">
				{isPostLoaded ? secondList : dummyList}
			</div>
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