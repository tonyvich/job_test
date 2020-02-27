import React from 'react';
import { Route, Switch } 	from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'


import Signup				from './components/users/signup'
import Signin				from './components/users/signin'
import ProductList			from './components/products/productsList/productsList'
import ProductCreate		from './components/products/productCreate/productCreate'
import ProductEdit			from './components/products/productEdit/productEdit'

import './App.css';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={ Signin }/>
				<Route exact path="/sign-up" component={ Signup }/>
				<Route exact path="/login" component={ Signin }/>
				<Route exact path="/products" component={ ProductList }/>
				<Route exact path="/products/create" component={ ProductCreate }/>
				<Route exact path="/products/edit/:id" component={ ProductEdit }/>
			</Switch>
		</Router>
	);
}

export default App;

