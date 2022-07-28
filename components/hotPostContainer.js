import React, { useEffect, useState } from "react"
import "../styles/home.css"
import { Link } from "react-router-dom"
import arrow from "../public/images/right-arrow.png"
import { collectionGroup } from "firebase/firestore"
import db from "../src/db"

const HotPostContainer = () => {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		const postRef = collectionGroup(db, "Posts")
	})

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
		</div>
	)
}

export default HotPostContainer