import { Timestamp, collectionGroup, getDocs, limit, orderBy, query, startAfter, startAt } from "firebase/firestore"
import React, { useCallback, useEffect, useState } from "react"
import db from "../src/db"

const usePostFetch = (page) => {
    
	const [isLoading, setIsLoading] = useState(true)
	const [posts, setPosts] = useState([])
	const [error, setError] = useState(false)
	const [lastDoc, setLastDoc] = useState(null)

	const sendQuery = useCallback(async () => {
		const myQuery = lastDoc ? 
			query(
				collectionGroup(db , "Posts"), 
				orderBy("timeStamp", "desc"), 
				startAfter(lastDoc),
				limit(10)
			) : 
			query(
				collectionGroup(db , "Posts"), 
				orderBy("timeStamp", "desc"), 
				// limit(10)
			)
		
		await setIsLoading(true)

		try {
			const querySnapshot = await getDocs(myQuery)
			const newPosts = querySnapshot.docs.map((docSnapshot) => {
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
    
			await setPosts([...posts, ...newPosts])
			await setLastDoc(querySnapshot.docs[9])
			setError(false)
		} catch (e) {
			console.log(e)
			setError(true)
		}
		

		setIsLoading(false)
	}, [page])

	useEffect(() => {
		console.log(lastDoc)
		sendQuery()
	}, [page])

	return { isLoading, error, posts }
}

export default usePostFetch