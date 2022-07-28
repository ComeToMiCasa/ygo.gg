export const processDate = (timeStamp) => {
	const today = new Date()
	const todayYear = today.getFullYear()
	const todayMonth = today.getMonth()
	const todayDate = today.getDate()

	const year = timeStamp.getFullYear()
	const month = timeStamp.getMonth()
	const date = timeStamp.getDate()

	if(todayYear === year && todayMonth === month && todayDate === date) {
		return timeStamp.toLocaleTimeString()
	} else {
		return `${year}.${month + 1}.${date}`
	}
}