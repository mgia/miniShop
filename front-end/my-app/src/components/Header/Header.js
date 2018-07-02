import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import cart from '../../img/shopping_cart.png'
import profile from '../../img/profile.png'
import admincrown from '../../img/admincrown.png'
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
						{/* <li><Link to='/'>Home</Link></li> */}
						<div className="shopbox"><li><Link to='/catalog' className="shoptext">Shop</Link></li></div>
						<div className="loginbox"><li><Link to='/login' className="logintext">Login</Link></li></div>
						<li><Link to='/cart'><img src={cart} className="cart" alt="shopping cart" title="shopping cart"/></Link></li>
						<li><Link to='/profile'><img src={profile} className="profile" alt="my profile" title="my profile"/></Link></li>
					</ul>
				</nav>
			</div>
		)

		this.loggedInAdmin = (
			<div>
				<nav>
					<ul>
						{/* <li><Link to='/'>Home</Link></li> */}
						<div className="shopbox"><li><Link to='/catalog' className="shoptext">Shop</Link></li></div>
						<div className="loginbox"><li><Link to='/login' className="logintext">Login</Link></li></div>
						<li><Link to='/admin'><img src={admincrown} className="admincrown" alt="admin" title="admin"/></Link></li>
						<li><Link to='/cart'><img src={cart} className="cart" alt="shopping cart" title="shopping cart"/></Link></li>
						<li><Link to='/profile'><img src={profile} className="profile" alt="my profile" title="my profile"/></Link></li>
					</ul>
				</nav>
			</div>
		)

		this.loggedOutMenu = (
			<div>
				<nav>
					<ul>
						{/* <li><Link to='/'>Home</Link></li> */}
						<div className="shopbox"><li><Link to='/catalog' className="shoptext">Shop</Link></li></div>
						<div className="loginbox"><li><Link to='/login' className="logintext">Login</Link></li></div>
					</ul>
				</nav>
			</div>
		)
		this.setNav()
	}


	setNav() {
		const loggedIn = true
		if (loggedIn) {
			this.setState({ nav: this.loggedInAdmin })
		} else {
			this.setState({ nav: this.loggedOutMenu })
		}
	}

	render() {
		return (
			<header>
				<div className="header"><Link to='/' className="headertext">cool store name</Link></div>
				{ this.state.nav }
				<hr/>
			</header>
		)
	}
}
export default Header
