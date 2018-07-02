import React, { Component } from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			token: null,
			loggedIn: false,
			cart: []
		}
	}

	tokenHandler(e) {
		this.setState({ token: e })
	}

	addToCart(e) {
		let newArr = this.state.cart
		e.quantity = 1
		newArr.push(e)
		this.setState({cart: newArr})
	}

	removeCartItem(id) {
		let newArr = this.state.cart
		newArr.splice(id, 1)
		this.setState({cart: newArr})
	}

	clearCart() {
		this.setState({cart: []})
	}
	render() {
		return (
			<div>
				<Header
					token={this.state.token}
					cart={this.state.cart}/>
				<Main
					token={this.state.token}
					cart={this.state.cart}
					handler={this.tokenHandler.bind(this)}
					addToCart={this.addToCart.bind(this)}
					removeCartItem={this.removeCartItem.bind(this)}
					clearCart={this.clearCart.bind(this)}
				/>
			</div>
		)
	}
}

export default App
