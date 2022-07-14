import { createContext } from "react"

export const userContext = createContext({
	username: null,
	setUsername: () => {},
	uid: null,
	setUid: () => {},
})
