import React, { Component } from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillMount() {
		this.initState()
		this.checkLoggedIn()
	}

	initState() {
		this.setState({ token : "1123123", loggedIn : false })
	}

	checkLoggedIn() {
		console.log(this.state.token)
		if (this.state.token != null)
			this.setState({ loggedIn : true })
	}

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
