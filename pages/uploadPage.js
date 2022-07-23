import React, { useState } from "react"
import storage from "../src/storage"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
 
export default function UploadPage() {
	const [file, setFile] = useState("")
	const [percent, setPercent] = useState(0)
 
	function handleChange(event) {
		setFile(event.target.files[0])
	}
 
	const handleUpload = () => {
 
		const storageRef = ref(storage, `/files/${file.name}`)
		const uploadTask = uploadBytesResumable(storageRef, file)
 
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const percent = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				)
 
				setPercent(percent)
			},
			(err) => console.log(err),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					console.log(url)
				})
			}
		)
	}
 
	return (
		<div>
			<input type="file" onChange={handleChange} accept="/image/*" />
			<button onClick={handleUpload}>Upload</button>
			<p>{percent + "%"}</p>
		</div>
	)
}