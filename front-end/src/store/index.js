import { createStore } from 'redux'
import reducer from "../reducers"

const initialState = {
	token: null,
	user: {},
	cart: [],
	items: []
}

const store = createStore(reducer, initialState)

export default store
