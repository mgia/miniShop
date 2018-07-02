import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import axios from 'axios'

class Login extends Component {

	constructor(props) {
		super(props)
		this.state = {
			username: "",
			password: "",
			redirect: false,
			error: ""
		}
	}

	validateForm = () => {
		return (this.state.username.length > 5 && this.state.password.length > 5);
	}
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({ error : "" })
		console.log(this.state.username.length + " " + this.state.password.length)
		if (this.validateForm()) {
			const url = "http://127.0.0.1:5000/"
			const option = "login/"
			axios.post(url + option, { name: this.state.username, password: this.state.password })
			.then( (res) => {
				alert("New user created. Please log in.")
				this.setState({ redirect : true })
			})
			.catch( (err) => {
				console.log(err)
			})
		} else {
			this.setState({ error : "Error: Username & password must both be 6+ characters." })
		}
	}

	render() {
		const { redirect } = this.state

		if (redirect)
			return (<Redirect to='/login'></Redirect>)

		return (
			<div>
			<h1>Register</h1>
			<form onSubmit={this.handleSubmit}>
				<div>
					<label>
						Username:
						<input type="text" name='username' value={this.state.username} onChange={this.handleChange} />
					</label>
				</div>
				<div>
					<label>
						Password:
						<input type="password" name='password' value={this.state.password} onChange={this.handleChange} />
					</label>
				</div>
				{this.state.error}
				<div>
					<input type="submit" value="Submit" />
					<Link to='/login'>Cancel</Link>
				</div>
			</form>
			</div>
		)
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
