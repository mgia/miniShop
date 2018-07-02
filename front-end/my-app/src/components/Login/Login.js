import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Login extends Component {

	constructor(props) {
		super(props)
		this.state = {
			username: "",
			password: "",
		}
	}

	validateForm() {
		return this.state.username.length > 0 && this.state.password.length > 0;
	}

	handleChange = (evt) => {
		this.setState({
			[evt.target.id] : evt.target.value
		})
	}
	render() {
		return (
			<div>
				<h2>Login</h2>
				<Link to='/register'>Sign Up</Link>
			</div>
		)
	}
}

export default Login
