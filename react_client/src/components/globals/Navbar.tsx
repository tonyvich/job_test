// Imports
import React, { Component } 	from 'react'
import { LinkContainer } 		from 'react-router-bootstrap';

// Bootstrap Imports
import Navbar 					from 'react-bootstrap/Navbar'
import Nav 						from 'react-bootstrap/Nav'

/**
 * Navbar with all main links
 *
 * @class AppNavbar
 * @extends {Component}
 */
class AppNavbar extends Component {

	/**
	 * Render Component
	 *
	 * @returns
	 * @memberof AppNavbar
	 */
	render () {
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
						<LinkContainer to='/product/create'>
							<Nav.Link>Create</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default AppNavbar;