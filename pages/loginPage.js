import React from "react"
import { signInWithPopup, signOut } from "firebase/auth"
import auth, { googleProvider } from "../src/auth"
import { useNavigate } from "react-router-dom"

const Login = () => {

	const navigate = useNavigate()

	const handleSignIn = () => {
		signInWithPopup(auth, googleProvider)
			.then((res) => {
				const user = res.user
				console.log(user.uid)
			})
			.then(() => {
				navigate(-1)
			})
			.catch((e) => console.error(e))
	}

	const handleSignOut = () => {
		signOut(auth)
			.then(() => console.log("sign out success"))
			.catch((e) => console.error(e))
	}

	return (
		<div>
			<button onClick={handleSignIn}>sign in with google</button>
			<button onClick={handleSignOut}>sign out</button>
		</div>
	)
}

export default Login
