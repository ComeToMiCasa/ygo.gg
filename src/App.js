import React, { useState, useEffect } from "react"
import Home from "../pages/homePage"
import DeckRegister from "../pages/deckRegisterPage"
import MatchRegister from "../pages/matchRegisterPage"
import { Route, Routes } from "react-router-dom"
import Header from "../components/header"
import Admin from "../pages/admin"
import { userContext, deckContext } from "./context"
import { onAuthStateChanged } from "firebase/auth"
import auth from "./auth"
import Login from "../pages/loginPage"
import MatchPage from "../pages/matchSearchPage"
import { collection, getDocs } from "firebase/firestore"
import db from "./db"
import NewPostPage from "../pages/newPostPage"
import UploadPage from "../pages/uploadPage"

const App = () => {
	const [username, setUsername] = useState("")
	const [uid, setUid] = useState("")
	const [decks, setDecks] = useState([])

	const deckRef = collection(db, "Decks")

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUid(user.uid)
				setUsername(user.displayName)
			} else {
				setUid(null)
				setUsername(null)
			}
		})
		return unsubscribe
	}, [])

	useEffect(() => {
		getDocs(deckRef).then((res) => {
			setDecks(
				res.docs.map((docSnapshot) => {
					const data = docSnapshot.data()
					return {
						label: data.name,
						value: docSnapshot.id,
					}
				})
			)
		})
	}, [])

	return (
		<userContext.Provider value={{ username, setUsername, uid, setUid }}>
			<deckContext.Provider value={{decks, setDecks}}>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/match" element={<MatchRegister />} />
					<Route path="/deck" element={<DeckRegister />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/login" element={<Login />} />
					<Route path="/match-search" element={<MatchPage/>}/>
					<Route path="/newpost" element={<NewPostPage/>}/>
					<Route path="/upload" element={<UploadPage/>}/>
				</Routes>
			</deckContext.Provider>
		</userContext.Provider>
	)
}

export default App
