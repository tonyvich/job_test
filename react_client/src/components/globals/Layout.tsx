// Imports
import React, { Component } from 'react'

// Bootstrap imports
import Container            from 'react-bootstrap/Container'

// App Imports
import AppNavbar            from './Navbar'

/**
 * Wrapper With Navbar for the pages
 */
class Layout extends Component {

    /**
     * Render Component
     *
     * @returns
     * @memberof Layout
     */
    render () {
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

export default Layout;