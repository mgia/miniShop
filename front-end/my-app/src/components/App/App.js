import React, { Component } from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			token: null,
			loggedIn: false,
			cart: [
				{"id": 1, "price": 10, "quantity": 1},
				{"id": 2, "price": 20, "quantity": 1}
			]
		}
	}

	tokenHandler(e) {
		this.setState({ token: e })
	}

	addToCart(e) {
		this.state.cart.push(e)
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
				/>
			</div>
		)
	}
}

export default App
