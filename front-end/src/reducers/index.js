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
			var newCart = state.cart
			newCart.splice(action.id, 1)
			return {
				...state,
				cart: newCart
			}
		default:
			return state
	}
}
