import React, { useEffect, useState } from "react"
import laundry from "../public/images/laundry.png"
import kit from "../public/images/kit.png"
import "../styles/preparing.css"

const PreparePage = () => {

	const [rand, setRand] = useState(0)

	useEffect(() => {
		setRand(Math.round(Math.random(0,1)))
	}, [])

	return (
		<div>
			{rand ? 
				<img src={laundry} style={{position: "absolute", bottom: 0}} width={600} height={600}/> :
				<img src={kit} style={{position: "absolute", left: 180, top: 130}} width={500} height={500}/>            
			}
			<div className="Title">
            서비스 준비 중
			</div>
			<div className="Paragraph">
            이런, <b>{rand ? "라도리" : "키토칼로스"}</b>가 티어 분석 페이지를 <br/><b>덤핑</b>해버렸다네요~ <br/><br/>운영진이 열심히 <b>샐비지 </b>중이니 <br/>조금만 기다려주세요!
			</div>
		</div>
	)
}

export default PreparePage