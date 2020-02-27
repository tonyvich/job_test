// Imports
import React, { Component } from 'react'

// Bootstrap imports
import Container from 'react-bootstrap/Container'

// App Imports
import AppNavbar from './Navbar'

import { connect } 			from 'react-redux';
import { Redirect } 		from "react-router-dom";

class Layout extends Component {

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