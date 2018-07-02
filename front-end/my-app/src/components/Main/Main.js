import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../Home/Home'
import Login from '../Login/Login'
import Catalog from '../Catalog/Catalog'
import Profile from '../Profile/Profile'
import Cart from '../Cart/Cart'
import Admin from '../Admin/Admin'
import Register from '../Register/Register'


class Main extends Component {

	loginPage = (props) => {
		return (<Login token={this.props.token} handler={this.props.handler}/>)
	}

	render() {
		return (
		<main>
			<Switch>
				<Route exact path='/' component={Home}/>
				<Route path='/login' component={this.loginPage}/>
				<Route path='/catalog' component={Catalog}/>
				<Route path='/profile' component={Profile}/>
				<Route path='/cart' component={Cart}/>
				<Route path='/admin' component={Admin}/>
				<Route path='/register' component={Register}/>
			</Switch>
		</main>
		)
	}
}

export default Main
