import React from "react"
import { Link } from "react-router-dom"
import logo from "../public/images/YGO.GG.png"

const Header = () => (
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

		<Link to="/login">
			<div style={{
				backgroundColor: "white",
				width: 70,
				height: 30,
				borderRadius: 15,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}>
				로그인
			</div>
		</Link>
	</div>
)

export default Header
