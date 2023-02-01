import { signOut } from "firebase/auth"
import React, { useContext } from "react"
import { Link } from "react-router-dom"
import auth from "../src/auth"
import { userContext } from "../src/context"
import "../styles/home.css"
import "../styles/header.css"


const Header = () => {
	const { uid } = useContext(userContext)

	const handleSignOut = () => {
		signOut(auth)
			.then(() => console.log("sign out success"))
			.catch((e) => console.error(e))
	}

	// const nameList = ["전적 검색", "전적 등록", "승률 통계", "티어 분석"]
	// const buttonList = nameList.map((name, index) => <HeaderButton name={name} key={index}/>)

	return (
		<div className="Header">

			<Link to="/" style={{textDecoration: "none", color: "inherit", gridColumn: "1/3"}}>
				{/* <img src={logo} /> */}
				<div className="Logo">
                    YGO.GG
				</div>
			</Link>
			<HeaderButton name="전적 검색" pos={8} link="/match-search"/>
			<HeaderButton name="전적 등록" pos={9} link="/match"/>
			<HeaderButton name="승률 통계" pos={10} link="/preparing"/>
			<HeaderButton name="티어 분석" pos={11} link="/preparing"/>
			<div className="LoginButtonContainer">
				{uid ? 
					(<div 
						className="LoginButton"
						onClick={handleSignOut}
					>
					로그아웃
					</div>) :
					(<Link to="/login" style={{
						textDecoration: "none",
						color: "rgb(2, 52, 63)",
					}}>
						<div className="LoginButton">
						로그인
						</div>
					</Link>)
				}
			</div>
			
		</div>
	)
}

const HeaderButton = ({ name, pos, link }) => {

	return (
		<div className="HeaderButtonContainer" style={{gridColumnStart: pos, gridColumnEnd: pos + 1}}>
			<Link to={link}>
				{name}
			</Link>
		</div>
	)
}


export default Header
