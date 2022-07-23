import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import storage from "./storage"

class UploadAdapter {
	constructor(loader) {
		this.loader = loader
	}

	upload() {
		return this.loader.file.then(
			(file) =>
				new Promise((resolve, reject) => {
					uploadBytes(
						ref(storage, file.name),
						file
					)
						.then((snapshot) => {
							return getDownloadURL(snapshot.ref)
						})
						.then((downloadURL) => {
							resolve({
								default: downloadURL,
							})
						}).catch((error) => {
							reject(error.message)
						})
				})
		)
	}
}

export default UploadAdapter