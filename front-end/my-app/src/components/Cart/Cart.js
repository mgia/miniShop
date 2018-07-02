import React, { Component } from 'react'

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cart: this.props.cart
		}
	}

	render() {
		if (this.state.cart.length === 0) {
			return <div>No items in cart. Go shop!</div>
		} else {
			return (
				<div>
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
