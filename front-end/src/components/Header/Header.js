import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import cart from '../../img/shopping_cart.png'
import profile from '../../img/profile.png'
import admincrown from '../../img/admincrown.png'
import './styles.css'
import Preview from '../Preview/Preview'
import store from '../../store'

class Header extends Component {

	state = {
		cart: this.props.cart,
		nav: null
	}

	loggedIn = (
			<div>
				<nav>
					<ul>
						<div className="shopbox"><li><Link to='/catalog' className="shoptext">Shop</Link></li></div>
						<li><Link to='/admin'><img src={admincrown} className="admincrown" alt="admin" title="admin"/></Link></li>
						<li><Link to='/cart'><img src={cart} className="cart" alt="shopping cart" title="shopping cart"/></Link></li>
						<li><Link to='/profile'><img src={profile} className="profile" alt="my profile" title="my profile"/></Link></li>
					</ul>
				</nav>
			</div>
	)

	loggedOut = (
		<div>
			<nav>
				<ul>
					<div className="shopbox"><li><Link to='/catalog' className="shoptext">Shop</Link></li></div>
					<div className="loginbox"><li><Link to='/login' className="logintext">Login</Link></li></div>
					<Link to='/cart'><img src={cart} className="cart" alt="shopping cart" title="shopping cart"/></Link>
				</ul>
			</nav>
		</div>
	)

	componentWillMount() {
		this.setNav()
		store.subscribe(this.setNav)
	}

	setNav = () => {
		if (store.getState().token) {
			this.setState({ nav: this.loggedIn })
		} else {
			this.setState({ nav: this.loggedOut })

		}
	}

	render() {
		return (
			<header>
				<div className="header"><Link to='/' className="headertext">ok store name</Link></div>
				<div>
					{this.state.nav}
					<Preview cart={this.props.cart} />
				</div>
				<hr/>
			</header>
		)
	}
}

export default Header
