import React, { useState, useEffect } from "react"
import Home from "../pages/home"
import DeckRegister from "../pages/deckRegister"
import MatchRegister from "../pages/matchRegister"
import { Route, Routes } from "react-router-dom"
import Header from "../components/header"
import Admin from "../pages/admin"
import { userContext } from "./context"
import { onAuthStateChanged } from "firebase/auth"
import auth from "./auth"
import Login from "../pages/login"

const App = () => {
	const [username, setUsername] = useState("")
	const [uid, setUid] = useState("")

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

	return (
		<userContext.Provider value={{ username, setUsername, uid, setUid }}>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/match" element={<MatchRegister />} />
				<Route path="/deck" element={<DeckRegister />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</userContext.Provider>
	)
}

export default App
