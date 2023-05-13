import React from "react"
import Select from "react-select"

const TitleBar = ({boardList, title, onTitleChange, onBoardChange, onSubmit}) => {
	const selectStyles = {
		control: (provided) => ({
			...provided,
			width: 200
		})
	}

	return(
		<div style={{
			display: "flex",
			marginBottom: 20,
			justifyContent: "space-around"
		}}>
			{/* <Select
				options={boardList}
				placeholder="게시판"
				styles={selectStyles}
				onChange={(newValue) => onBoardChange(newValue)}
			/> */}
			<div style={{
				display: "flex",
			}}>
				<input
					placeholder="제목"
					style={{
						fontSize: 18,
						width: 1105,
						height: 35,
						marginRight: 20,
						border: "1px solid #ccc",
						borderRadius: 4,
						paddingLeft: 8
					}}
					onChange={onTitleChange}
					value={title}
				/>
				<button style={{width: 60, fontSize: 18 }} onClick={onSubmit}>등록</button>
			</div>
			
		</div>
	)
}

export default TitleBar