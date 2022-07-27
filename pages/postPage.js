import DOMPurify from "dompurify"
import { doc, getDoc } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import db from "../src/db"
import "../styles/post.css"

const PostPage = () => {
	const { state: { id, board } } = useLocation()

	const [data, setData] = useState(null)

	useEffect(() => {
		const docRef = doc(db, `Boards/${board.value}/Posts`, id)
		getDoc(docRef).then((docSnapshot) => {
			setData(docSnapshot.data())
		})
	}, [])

	useEffect(() => {
		console.log(data)
	}, [data])

	const { title, content, timeStamp, user } = data || {}

	return (
		<div className="PostContainer">
			<div className="PostBoardContainer">
				{board.label + "게시판"}
			</div>
			<div className="PostTitleBar">
				<div className="PostTitle">
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