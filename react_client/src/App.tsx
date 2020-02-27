// Imports
import * as React 			from 'react';
import { Route, Switch } 	from 'react-router-dom'

// App Imports
import Layout 			from './components/globals/Layout';
import ProductsList 	from './components/products/productsList/productsList';
import ProductsCreate	from './components/products/productCreate/productCreate';
import ProductEdit		from './components/products/productEdit/productEdit';

/**
 * Base App Class
 *
 * @export
 * @class App
 * @extends {React.Component}
 */
export default class App extends React.Component {
	
	/**
	 * Render Component
	 *
	 * @returns
	 * @memberof App
	 */
	render() {
		return( 		
			<Layout>
				<Switch>
					<Route exact path="/" component={ ProductsList }/>
					<Route path="/product/create" component={ ProductsCreate }/>
					<Route path="/product/edit/:id" component={ ProductEdit }/>
				</Switch>
			</Layout>
		)
	}
}
