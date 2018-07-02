import React, { Component } from 'react'

class Preview extends Component {

	constructor(props) {
		super(props)
		this.state = {
			cart: [],
			total: 0,
			amount: 0
		}
	}

	changePrice = (cart) => {
		let amount = cart.length
		let total = 0
		cart.forEach(function (item) {
			total += (item.price)
		})
		this.setState({ amount: amount, total: total })
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.cart !== this.state.cart) {
			this.changePrice(nextProps.cart)
		}
	}

	render() {
		return (
			<div>
				<b>Cart Preview</b><br/>
				Number of Items: {this.state.amount}<br/>
				Total Price: (${this.state.total})
				{this.state.cart}
			</div>
		)
	}
}
export default Preview
