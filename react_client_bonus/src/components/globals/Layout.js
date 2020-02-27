// Imports
import React, { Component } from 'react'
import { Redirect } 		from "react-router-dom";
import { connect } 			from 'react-redux';

// Bootstrap imports
import Container            from 'react-bootstrap/Container'

// App Imports
import AppNavbar            from './Navbar'

/**
 * Provide a Layout for connected users
 *
 * @class Layout
 * @extends {Component}
 */
class Layout extends Component {

    /**
     * Render the component
     *
     * @returns
     * @memberof Layout
     */
    render () {
        // Kick out not connected user
        if( !this.props.loggedIn ) {
            return <Redirect to={`/login`} />
        }

        return (
            <div>
                <Container>
                    <AppNavbar></AppNavbar>
                    { this.props.children }
                </Container>
            </div>
        )
    }

}

/**
 * Get Global State
 * @param {*} state 
 */
const mapStateToProps = ( state ) => {
	return { 
		loggedIn: 	state.user.loggedIn
	}
}

export default connect(mapStateToProps, null)(Layout);