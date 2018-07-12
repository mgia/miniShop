export default (state, action) => {
	switch (action.type) {
		case "SET_TOKEN":
			return {
				...state,
				token: action.token
			}
		case "ADD_ITEM":
			const newCart = state.cart
			newCart.push(action.item)
			return {
				...state,
				cart: newCart
			}
		case "REMOVE_ITEM":
			const newCart1 = state.cart
			newCart1.splice(action.id, 1)
			return {
				...state,
				cart: newCart1
			}
		case "CLEAR_CART":
			return {
				...state,
				cart: []
			}
		default:
			return state
	}
}
