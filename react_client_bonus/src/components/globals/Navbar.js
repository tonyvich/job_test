// Imports
import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from "react-router-dom";

// Bootstrap Imports
import Navbar 	from 'react-bootstrap/Navbar'
import Nav 		from 'react-bootstrap/Nav'

/**
 * App Navbar
 *
 * @class AppNavbar
 * @extends {Component}
 */
class AppNavbar extends Component {

	state = { disconnect: false }

	/**
	 * User logout logic
	 *
	 * @memberof AppNavbar
	 */
	logout = ( event ) => {
		this.setState( { disconnect: true } );
		localStorage.removeItem( 'token' );
	}

	/**
	 * Render the component
	 *
	 * @returns
	 * @memberof AppNavbar
	 */
	render () {
		if( this.state.disconnect ) {
			return( 
				<Redirect to="/"></Redirect>
			)
		}
		return (
			<Navbar bg="light" expand="lg">
			<LinkContainer to='/'>
				<Navbar.Brand href="#home">ProductAPP</Navbar.Brand>
			</LinkContainer>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<LinkContainer to='/'>
							<Nav.Link>List</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/products/create'>
							<Nav.Link>Create</Nav.Link>
						</LinkContainer>
						<Nav.Link onClick={this.logout}>Deconnexion</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default AppNavbar;