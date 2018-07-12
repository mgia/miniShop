import React, { Component, } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'
import './styles.css'
import store from "../../store"

class Cart extends Component {

	state = {
		redirect: false,
		error: ""
	}

	sendOrder = () => {

		const state = store.getState()

		if (!state.token)
			alert("Please log in!")
		else {
			const url = "http://127.0.0.1:5000/"
			const option = "order"
			const data = {
				"orders": state.cart
			}
			axios.post(url + option, data, {
				headers: {'x-access-token': state.token }
			})
			.then((res) => {
				alert("Order successful")
				store.dispatch({ type: "CLEAR_CART" })
				this.setState({ redirect : true })
			})
			.catch((err) => {
				console.log(err)
				this.setState({ error: "Login failed." })
			})
		}
	}

	removeCartItem = (id) => {
		store.dispatch({type: "REMOVE_ITEM", id})
		this.getCart()
	}

	getCart = () => {
		const cart = store.getState().cart
		this.setState({cart: cart})
	}

	componentWillMount() {
		this.getCart()
	}

	render() {
		const { redirect, cart } = this.state

		if (redirect)
			return (<Redirect to='/catalog'></Redirect>)

		if (cart.length === 0) {
			return <div className="noitems">No items in cart. Go shop!</div>
		} else {
			return (
				<div>
				<button onClick={() => this.sendOrder()}>Send order</button>
				{this.state.cart.map( (item, i, obj) => (
					<div key={i}><img alt={item.desciption} className="image mnSize" src={item.image_url}/><br/>
					{item.name}<br/>
					{item.price}<br/>
					{item.description}
					<button onClick={() => this.removeCartItem(i) }>Remove from Cart</button>
					</div>
				))}
				</div>
			);
		}
	}
}
export default Cart
