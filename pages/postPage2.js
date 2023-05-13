import DOMPurify from "dompurify"
import { doc, getDoc, serverTimestamp } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import db from "../src/db"
import "../styles/post.css"

const PostPage = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	
	const id = searchParams.get("id")
	const board = searchParams.get("board")

	const [data, setData] = useState(null)

	useEffect(() => {
		const docRef = doc(db, `Boards/${board}/Posts`, id)
		getDoc(docRef).then((docSnapshot) => {
			setData(docSnapshot.data())
		})
	}, [])

	const { title, content, timeStamp, user } = data || {}

	useEffect(() => {
		console.log(data)
	}, [data])

	return (
		<div className="PostContainer">
			<div className="PostTitleBar">
				<div className="PostTitleContainer">
					{title}
				</div>
				<div className="PostTimeStampContainer">
					<div className="PostTimeStamp">
						{timeStamp?.toDate().toLocaleDateString()} {timeStamp?.toDate().toLocaleTimeString()}
					</div>
					<div className="PostTimeStampDivider">
                        |
					</div>
					<div className="PostTimeStamp">
						{user?.username}
					</div>
				</div>
			</div>
			<div dangerouslySetInnerHTML={{
				__html: DOMPurify.sanitize(content)
			}}/>
		</div>
	)
}

export default PostPage