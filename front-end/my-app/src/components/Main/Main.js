import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../Home/Home'
import Login from '../Login/Login'
import Catalog from '../Catalog/Catalog'
import Profile from '../Profile/Profile'
import Cart from '../Cart/Cart'
import Admin from '../Admin/Admin'

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Home}/>
			<Route path='/login' component={Login}/>
			<Route path='/catalog' component={Catalog}/>
			<Route path='/profile' component={Profile}/>
			<Route path='/cart' component={Cart}/>
			<Route path='/admin' component={Admin}/>
		</Switch>
	</main>
)

export default Main
