import { signOut } from "firebase/auth"
import React, { useContext } from "react"
import { Link } from "react-router-dom"
import logo from "../public/images/YGO.GG.png"
import auth from "../src/auth"
import { userContext } from "../src/context"
import "../styles/home.css"

const Header = () => {
	const { uid } = useContext(userContext)

	const handleSignOut = () => {
		signOut(auth)
			.then(() => console.log("sign out success"))
			.catch((e) => console.error(e))
	}

	return (
		<div style={{
			width:"100%",
			backgroundColor: "#02343F",
			padding: 10,
			boxSizing: "border-box",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center"
		}}>

			<Link to="/">
				<img src={logo} />
			</Link>

			{uid ? 
				(<div 
					className="LoginButton"
					onClick={handleSignOut}
				>
					로그아웃
				</div>) :
				(<Link to="/login" style={{
					textDecoration: "none",
					color: "rgb(2, 52, 63)"
				}}>
					<div className="LoginButton">
						로그인
					</div>
				</Link>)
			}
		</div>
	)
}

export default Header
