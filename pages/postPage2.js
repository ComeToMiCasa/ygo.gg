import DOMPurify from "dompurify"
import { doc, getDoc } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import db from "../src/db"
import "../styles/post.css"

const PostPage = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const id = searchParams.get("id")

	return (
		<div>
			{id}
		</div>
	)
}

export default PostPage