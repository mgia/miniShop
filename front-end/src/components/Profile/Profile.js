import React, { Component } from 'react'
import axios from 'axios'
import store from '../../store'

class Profile extends Component {

	getOrders = () => {
		const token = store.getState().token
		if (!token)
			return
		else {
			const url = "http://127.0.0.1:5000/"
			const option = "order"
			axios.get(url + option, {}, {
				headers: {'x-access-token': token }
			})
			.then((res) => {
				this.setState({
					isLoaded: true,
					orders: res.data.orders
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
	}

	render() {
		return (
			<h2>Profile</h2>
		)
	}
}

export default Profile
