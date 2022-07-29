import React, { useEffect, useState } from "react"
import "../styles/home.css"
import { Link, useNavigate } from "react-router-dom"
import arrow from "../public/images/right-arrow.png"
import { collectionGroup, getDocs, limit, orderBy, query } from "firebase/firestore"
import db from "../src/db"

const HotPostContainer = () => {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		const postRef = collectionGroup(db, "Posts")
		getDocs(query(postRef, orderBy("timeStamp", "desc"), limit(20)))
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
	})

	const hotPostList = posts.map(({ id, board, title, user }) => (
		<HotPostEntry 
			key={id} 
			id={id} 
			board={board} 
			title={title} 
			user={user} 
		/>
	))

	return (
		<div className="HotPostContainer">
			<div className="HotPostTitleBar">
				<div className="HotPostTitle">
					실시간 게시글
				</div>
				<div className="Arrow">
					<Link to="/board">
						<img src={arrow} width={25} color="white"/>
					</Link>
				</div>
			</div>
			{hotPostList}
		</div>
	)
}

const HotPostEntry = ({ id, board, title, user }) => {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate("../Post", { state: { id, board } })
	}

	return (
		<div className="HotPostEntry" onClick={handleClick}>
			<div className="HotPostEntryInside">
				{title}
			</div>
			<div className="HotPostEntryInside">
				{user.username}
			</div>
		</div>
	)
}

export default HotPostContainer