import React, { useContext, useState } from "react"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document"
import TitleBar from "../components/titleBar"
import UploadAdapter from "../src/upload"
import db from "../src/db"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { boardContext, userContext } from "../src/context"
import { useNavigate } from "react-router-dom"

const NewPostPage = () => {
	const editorConfig ={
		heading: {
			options: [
				{ model: "paragraph", title: "본문", class: "ck-heading_paragraph" },
				{ model: "heading1", view: "h2", title: "소제목 1", class: "ck-heading_heading1" },
				{ model: "heading2", view: "h3", title: "소제목 2", class: "ck-heading_heading2" }
			]
		},
	}

	const { uid, username } = useContext(userContext)
	const { boards } = useContext(boardContext)

	const [board, setBoard] = useState(null)
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")

	const navigate = useNavigate()

	const handleSubmit = (() => {
		if(!board) {
			alert("게시판을 선택해주세요")
			return 
		} else if(title === "") {
			alert("제목을 입력해주세요")
			return 
		} else if(!content) {
			alert("본문을 입력해주세요")
			return 
		}

		const parser = new DOMParser()
		const parsedDoc = parser.parseFromString(content, "text/html")
		const thumbnail = parsedDoc.getElementsByTagName("img")[0].src

		const userPostRef = collection(db, `Users/${uid}/MyPosts`)
		const postRef = collection(db, `Boards/${board.value}/Posts`)
		addDoc(postRef, {
			board,
			title,
			content,
			thumbnail,
			user: { uid, username },
			timeStamp: Timestamp.now()
		})
			.then((docRef) => (docRef.id))
			.then((id) => (addDoc(userPostRef, { id })))
			.then((docRef) => console.log(docRef.id))
			.catch((e) => console.log(e))
		
		setBoard(null)
		setTitle("")
		setContent("")
		navigate("../board")
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
				boardList={boards.map(({ id, name }) => ({ label: name, value: id }))}
				title={title}
				onTitleChange={(e) => setTitle(e.target.value)}
				onBoardChange={setBoard}
				onSubmit={handleSubmit}
			/>
			<CKEditor
				editor={DecoupledEditor}
				config={editorConfig}
				onReady={(editor) => {
					editor.plugins.get("FileRepository").createUploadAdapter = (
						(loader) => (new UploadAdapter(loader))
					)
					editor.ui.getEditableElement().parentElement.insertBefore(
						editor.ui.view.toolbar.element,
						editor.ui.getEditableElement()
					)
				}}
				onChange={(_, editor) => setContent(editor.getData())}
			/>
		</div>
	)
}

export default NewPostPage 