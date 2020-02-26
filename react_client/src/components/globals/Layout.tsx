// Imports
import React, { Component } from 'react'

// Bootstrap imports
import Container from 'react-bootstrap/Container'

// App Imports
import AppNavbar from './Navbar'

class Layout extends Component {

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