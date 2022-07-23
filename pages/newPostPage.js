import React, { useContext, useState } from "react"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import TitleBar from "../components/titleBar"
import UploadAdapter from "../src/upload"
import db from "../src/db"
import { addDoc, collection } from "firebase/firestore"
import { userContext } from "../src/context"

const NewPostPage = () => {
	const editorConfig ={
		heading: {
			options: [
				{ model: "paragraph", title: "본문", class: "ck-heading_paragraph" },
				{ model: "heading1", view: "h2", title: "소제목 1", class: "ck-heading_heading1" },
				{ model: "heading2", view: "h3", title: "소제목 2", class: "ck-heading_heading2" }
			]
		}
	}

	const { uid } = useContext(userContext)

	const [board, setBoard] = useState(null)
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")

	const postRef = collection(db, "Posts")

	const handleSubmit = (() => {
		const userPostRef = collection(db, `Users/${uid}/Posts`)
		addDoc(postRef, {
			board,
			title,
			content,
			user: uid
		})
			.then((docRef) => (docRef.id))
			.then((id) => (addDoc(userPostRef, { id })))
			.then((docRef) => console.log(docRef.id))
			.catch((e) => console.log(e))
		
		setBoard(null)
		setTitle("")
		setContent("")
	})
	

	return (
		<div style={{
			width: 1200,
			height: 700,
			marginLeft: "auto",
			marginRight: "auto",
			marginTop: 50
		}}>
			<TitleBar
				title={title}
				onTitleChange={(e) => setTitle(e.target.value)}
				onBoardChange={setBoard}
				onSubmit={handleSubmit}
			/>
			<CKEditor
				editor={ClassicEditor}
				config={editorConfig}
				onReady={(editor) => {
					editor.plugins.get("FileRepository").createUploadAdapter = (
						(loader) => (new UploadAdapter(loader))
					)
				}}
				onChange={(_, editor) => setContent(editor.getData())}
			/>
		</div>
	)
}

export default NewPostPage 