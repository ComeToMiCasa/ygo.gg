import React from "react"
import { Link } from "react-router-dom"

const Header = () => (
	<div>
		<Link to="/">
			<div>[Logo]</div>
		</Link>
		<Link to="/match">
			<div>[Match]</div>
		</Link>
		<Link to="/deck">
			<div>[Decks]</div>
		</Link>
		<Link to="/login">
			<div>[Login]</div>
		</Link>
	</div>
)

export default Header
