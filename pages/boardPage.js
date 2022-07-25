import { collection, collectionGroup, getDocs, query } from "firebase/firestore"
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
			getDocs(query(collectionGroup(db, "Posts")))
				.then((querySnapshot) => {
					setPosts(
						querySnapshot.docs.map((docSnapshot) => ({
							id: docSnapshot.id,
							title: docSnapshot.data().title
						}))
					)
				})
		} else {
			getDocs(collection(db, `Boards/${board.id}/Posts`))
				.then((querySnapshot) => {
					setPosts(
						querySnapshot.docs.map((docSnapshot) => ({
							id: docSnapshot.id,
							title: docSnapshot.data().title
						}))
					)
				})
		}
	}, [board])

	
	return (
		<PostContainer boards={boards} onBoardSelect={setBoard} posts={posts}/>
	)
}

export default BoardPage