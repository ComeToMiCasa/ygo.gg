import { createContext } from "react"

export const userContext = createContext({
	username: null,
	setUsername: () => {},
	uid: null,
	setUid: () => {},
})

export const deckContext = createContext({
	decks: [],
	setDecks: () => {}
})

export const boardContext = createContext({
	boards: [],
	setBoards: () => {}
})