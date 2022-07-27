import { collection, collectionGroup, getDocs, orderBy, query } from "firebase/firestore"
import React, { useContext, useEffect, useState } from "react"
import PostContainer from "../components/postContainer"
import { boardContext } from "../src/context"
import db from "../src/db"

const BoardPage = () => {
	const { boards } = useContext(boardContext)
	const [board, setBoard] = useState(null)
	const [posts, setPosts] = useState([])

	useEffect(() => {
		if(!board) {
			getDocs(query(collectionGroup(db, "Posts"), orderBy("timeStamp", "desc")))
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
			getDocs(query(collection(db, `Boards/${board.id}/Posts`), orderBy("timeStamp", "desc")))
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

	
	return (
		<PostContainer selectedBoard={board} boards={boards} onBoardSelect={setBoard} posts={posts}/>
	)
}

export default BoardPage