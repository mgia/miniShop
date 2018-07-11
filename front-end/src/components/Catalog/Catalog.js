import React, { Component } from 'react'
import axios from 'axios'
import './styles.css'
import store from "../../store"

const addToCart = (item) => ({type: "ADD_ITEM", item})

class Catalog extends Component {

	state = {
		error: null,
		isLoaded: false,
		items: []
	}

	getItems = () => {
		const url = "http://127.0.0.1:5000/"
		const option = "item/"
		axios.get(url + option, {}, {})
		.then((res) => {
			this.setState({
				isLoaded: true,
				items: res.data.items
			})
		})
		.catch( (err) => {
			console.log(err)
			this.setState({
				isLoaded: true,
				error: true
			})
		})
	}

	addItem = (item) => {
		store.dispatch(addToCart(item))
	}

	componentDidMount() {
		this.getItems()
	}

	render() {
		const { error, isLoaded, items } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<div>
				{items.map( (item, i, obj) => (
					<div key={i}><img className="imageSize" alt="img" src={item.image_url}/><br/>
					{item.name} {item.price} {item.description}
					<button onClick={() => this.addItem(item) }>Add to Cart</button>
					</div>
				))}
				</div>
			);
		}
	}
}

export default Catalog
