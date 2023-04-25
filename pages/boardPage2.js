import React, { useContext, useEffect, useState } from "react"
import { collection, collectionGroup, getDocs, orderBy, query } from "firebase/firestore"
import { useLocation } from "react-router-dom"
import PostContainer from "../components/postContainer"
import { boardContext } from "../src/context"
import db from "../src/db"
import { limit } from "firebase/firestore"
import "../styles/board.css"

const BoardPage = () => {
	const { boards } = useContext(boardContext)
	const [board, setBoard] = useState(null)
	const [posts, setPosts] = useState(null)

	const { state } = useLocation()
	const boardParam = state?.boardParam

	useEffect(() => {setBoard(boardParam)}, [])

	useEffect(() => {
		if(!board) {
			getDocs(query(collectionGroup(db, "Posts"), orderBy("timeStamp", "desc")), limit(10))
				.then((querySnapshot) => {
					setPosts(
						querySnapshot.docs.map((docSnapshot) => {
							const { user, title, board, timeStamp } = docSnapshot.data()
							return {
								id: docSnapshot.id,
								timeStamp: timeStamp.toDate(),
								board,
								title,
								user,
							}
						})
					)
				})
		} else {
			getDocs(query(collection(db, `Boards/${board.id}/Posts`), orderBy("timeStamp", "desc")), limit(10))
				.then((querySnapshot) => {
					setPosts(
						querySnapshot.docs.map((docSnapshot) => {
							const { user, title, board, timeStamp } = docSnapshot.data()
							return {
								id: docSnapshot.id,
								timeStamp: timeStamp.toDate(),
								board,
								title,
								user,
							}
						})
					)
				})
		}
	}, [board])

	useEffect(() => {
		if(posts != null) {
			console.log(posts)
		}
	}, [posts])

	const dummyList = Array.apply(null, Array(5)).map(_ => <BoardEntry isDummy={true} postInfo={undefined}/>)

	return (
		<div className="BoardContainer">
			<div className="BoardHorizontalContainer">
				{dummyList}
			</div>
			<div className="BoardHorizontalContainer">
				{dummyList}
			</div>
		</div>
	)
}

const BoardEntry = ({isDummy, postInfo}) => {

	const { timeStamp, title, user } = postInfo || {}

	return(isDummy ? <div className="BoardEntry"/> : 
		<div className="BoardEntry">
			{title}
		</div>
	)
}

export default BoardPage