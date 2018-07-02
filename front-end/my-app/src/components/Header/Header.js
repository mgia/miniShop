import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

class Header extends Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillMount() {
		this.loggedInUser = (
			<div>
				<nav>
					<ul>
						<li><Link to='/'>Home</Link></li>
						<li><Link to='/catalog'>Shop</Link></li>
						<li><Link to='/login'>Login</Link></li>
						<li><Link to='/cart'>Cart</Link></li>
						<li><Link to='/profile'>Profile</Link></li>
					</ul>
				</nav>
			</div>
		);

		this.loggedInAdmin = (
			<div>
				<nav>
					<ul>
						<li><Link to='/'>Home</Link></li>
						<li><Link to='/catalog'>Shop</Link></li>
						<li><Link to='/login'>Login</Link></li>
						<li><Link to='/admin'>Admin</Link></li>
						<li><Link to='/cart'>Cart</Link></li>
						<li><Link to='/profile'>Profile</Link></li>
					</ul>
				</nav>
			</div>
		);

		this.loggedOutMenu = (
			<div>
				<nav>
					<ul>
						<li><Link to='/'>Home</Link></li>
						<li><Link to='/catalog'>Shop</Link></li>
						<li><Link to='/login'>Login</Link></li>
					</ul>
				</nav>
			</div>
		)
		this.setNav()
	}


	setNav() {
		const loggedIn = this.props.LoggedIn
		if (loggedIn) {
			this.setState({ nav: this.loggedInAdmin })
		} else {
			this.setState({ nav: this.loggedOutMenu })
		}
	}

	render() {
		return (
			<header>
				<div className="header">Header</div>
				{ this.state.nav }
			</header>
		)
	}
}
export default Header
