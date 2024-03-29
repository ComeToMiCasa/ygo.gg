import {
	addDoc,
	collection,
	deleteDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore"
import React, { useEffect, useState } from "react"
import db from "../src/db"

function Admin() {
	const pendingRef = collection(db, "PendingDecks")
	const deckRef = collection(db, "Decks")

	const [pending, setPending] = useState([])
	const [decks, setDecks] = useState([])
	const [reload, setReload] = useState(false)

	useEffect(() => {
		getDocs(pendingRef).then((res) => {
			setPending(
				res.docs.map((docSnapshot) => ({
					name: docSnapshot.data().name,
				}))
			)
		})
		getDocs(deckRef).then((res) => {
			setDecks(
				res.docs.map((docSnapshot) => {
					const data = docSnapshot.data()
					return {
						name: data.name,
						id: docSnapshot.id,
					}
				})
			)
		})
	}, [reload])

	useEffect(() => console.log(pending), [pending])

	const handleSubmit = (name) => {
		addDoc(deckRef, {
			name,
			gameTotal: 0,
			gameWin: 0,
			gameWinRate: 0,
			matchTotal: 0,
			matchWin: 0,
			matchWinRate: 0,
		})
			.then((docRef) => console.log(docRef.id))
			.catch((e) => console.error(e))
		const q = query(pendingRef, where("name", "==", name))
		getDocs(q)
			.then((res) =>
				res.forEach((docSnapshot) =>
					deleteDoc(docSnapshot.ref)
						.then(() => console.log("delete success"))
						.catch((e) => console.error(e))
				)
			)
			.then(() => setReload(!reload))
	}

	const handleReject = (name) => {
		const q = query(pendingRef, where("name", "==", name))
		getDocs(q)
			.then((res) =>
				res.forEach((docSnapshot) =>
					deleteDoc(docSnapshot.ref)
						.then(() => console.log("delete success"))
						.catch((e) => console.error(e))
				)
			)
			.then(() => setReload(!reload))
	}

	const pendingList = pending.map(({ name }, index) => (
		<PendingEntry
			name={name}
			onSubmit={() => handleSubmit(name)}
			onReject={() => handleReject(name)}
			key={index}
		/>
	))

	const deckList = decks.map(({ name, id }, index) => (
		<div key={index}>
			{name} {id}
		</div>
	))

	return (
		<div>
			{pendingList}
			<br />
			{deckList}
		</div>
	)
}

function PendingEntry({ name, onSubmit, onReject }) {
	return (
		<div>
			{name}
			<button onClick={onSubmit}>승인</button>
			<button onClick={onReject}>거절</button>
		</div>
	)
}

export default Admin
