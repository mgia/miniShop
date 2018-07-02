import React, { Component, } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cart: this.props.cart,
			redirect: false
		}
	}

	sendOrder = () => {
		if (!this.props.token)
			return
		const url = "http://127.0.0.1:5000/"
		const option = "order/"
		const data = {
			"orders": this.state.cart
		}
		axios.post(url + option, {}, {
			headers: {'x-access-token': this.props.token }
		})
		.then((res) => {
			alert("Order successful")
			this.setState({ redirect : true })
		})
		.catch( (err) => {
			console.log(err)
			this.setState({ error: "Login failed." })
		})
		this.props.clearCart()
	}

	render() {
		const { redirect } = this.state

		if (redirect)
			return (<Redirect to='/catalog'></Redirect>)

		if (this.state.cart.length === 0) {
			return <div>No items in cart. Go shop!</div>
		} else {
			return (
				<div>
				<button onClick={this.sendOrder()}>Send order</button>
				{this.state.cart.map( (item, i, obj) => (
					<div key={i}><img alt={item.desciption} className="imageSize" src={item.image_url}/><br/>
					{item.name}<br/>
					{item.price}<br/>
					{item.description}
					<button onClick={() => this.props.removeCartItem(i) }>Remove from Cart</button>
					</div>
				))}
				</div>
			);
		}
	}
}
export default Cart
