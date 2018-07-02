import React, { Component } from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			token: null,
			loggedIn: false,
		}
	}

	tokenHandler(e) {
		e.preventDefault()
		this.setState({ token: e })
	}
	// componentWillMount() {
	// 	this.checkLoggedIn()
	// }
    //
	// checkLoggedIn = () => {
	// 	if (this.state.token != null)
	// 		this.setState({ loggedIn : true })
	// }

	render() {
		return (
			<div>
				{this.state.token}
				<Header token={this.state.token} handler={this.tokenHandler.bind(this)}/>
				<Main token={this.state.token}/>
			</div>
		)
	}
}

export default App
