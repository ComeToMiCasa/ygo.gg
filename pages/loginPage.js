import React from "react"
import { signInWithPopup } from "firebase/auth"
import auth, { googleProvider, twitterProvider } from "../src/auth"
import { useNavigate } from "react-router-dom"
import "../styles/login.css"
import GoogleLogo from "../public/images/Google-color.svg"
import TwitterLogo from "../public/images/Twitter-color.svg"

const Login = () => {

	const navigate = useNavigate()

	const handleSignIn = (provider) => {
		signInWithPopup(auth, provider)
			.then((res) => {
				const user = res.user
				console.log(user.uid)
			})
			.then(() => {
				navigate(-1)
			})
			.catch((e) => console.error(e))
	}

	return (
		<div className="LoginContainer">
			<div className="SocialLoginButton" id="Google" onClick={() => handleSignIn(googleProvider)}>
				<GoogleLogo className="SocialLogo"/>
				<div className="SocialText">Google 계정으로 로그인</div>
			</div>
			<div className="SocialLoginButton" id="Twitter" onClick={() => handleSignIn(twitterProvider)}>
				<TwitterLogo className="SocialLogo"/>
				<div className="SocialText">Twitter 계정으로 로그인</div>
			</div>
		</div>
	)
}

export default Login
