import React, { Component } from 'react'
import './styles.css'
import store from '../../store'

class Preview extends Component {

	state = {
		total: 0,
		amount: 0
	}

	changePrice = () => {
		const cart = store.getState().cart
		let amount = cart.length
		let total = 0
		cart.forEach(function (item) {
			total += (item.price)
		})
		this.setState({ amount: amount, total: total })
	}

	componentWillMount() {
		store.subscribe(this.changePrice)
	}

	render() {
		return (
			<div className="preview">
				<b>Cart Preview</b><br/>
				Number of Items: {this.state.amount}<br/>
				Total Price: (${this.state.total})
			</div>
		)
	}
}
export default Preview
