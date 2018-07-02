import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import axios from 'axios'

// import './styles.css'

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

	// changeToken = {() => this.props.handler("bye")}
	validateForm = () => {
		return (this.state.username.length > 0 && this.state.password.length > 0);
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
			const basicAuth = 'Basic ' + btoa(this.state.username + ':' + this.state.password)
			axios.post(url + option, {}, {
				headers: {'Authorization': basicAuth }
			})
			.then((res) => {
				this.props.handler(res.data.token)
				alert("Login successful")
				this.setState({ redirect : true })
			})
			.catch( (err) => {
				console.log(err)
				this.setState({ error: "Login failed." })
			})
		} else {
			this.setState({ error : "Error: Username & password must both be 6+ characters." })
		}
	}

	render() {
		const { redirect } = this.state

		if (redirect)
			return (<Redirect to='/catalog'></Redirect>)

		return (
			<div>
				<h1 className="logint">Login</h1>
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
						<input type="submit" value="Sign in" />
					</div>
				</form>
				<div className="signupbox">
					<Link to='/register' className="signup">Sign up</Link>
				</div>
			</div>
		)
	}
}

export default Login
