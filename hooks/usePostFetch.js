import { Timestamp, collectionGroup, getDocs, limit, orderBy, query, startAt } from "firebase/firestore"
import React, { useCallback, useEffect, useState } from "react"
import db from "../src/db"

const usePostFetch = (page) => {
    
	const [isLoading, setIsLoading] = useState(true)
	const [postList, setPostList] = useState([])
	const [error, setError] = useState(false)

	const sendQuery = useCallback(async () => {
		const myQuery = query(collectionGroup(
			db, 
			"Posts", 
			orderBy("timeStamp", "desc"), 
			startAt(page * 10), 
			limit(10)
		))
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
    
			await setPostList([...postList, ...newPosts])
			setError(false)
		} catch (e) {
			console.log(e)
			setError(true)
		}
		

		setIsLoading(false)
	}, [page])

	useEffect(() => {
		sendQuery()
	}, [page])

	return { isLoading, error, postList }
}

export default usePostFetch