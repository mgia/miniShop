import React, { Component } from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			token: null,
			current_user: null,
			loggedIn: false,
		}
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
				<Header loggedIn={this.state.loggedIn}/>
				<Main />
			</div>
		)
	}
}

export default App
