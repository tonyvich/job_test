import React, {Component} from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Redirect } from "react-router-dom";
// Redux
import { userLoginFetch, checkUserConnected } from '../../actions/user';
import { connect } from 'react-redux';

/**
 * Display login for user
 *
 * @class Signin
 * @extends {Component}
 */
class Signin extends Component {
    
    /** 
     * Local State
     */
    state = {
        email: "",
        password: ""
    }

    /**
     * Redirect if the user is connected
     *
     * @memberof Signin
     */
    componentDidMount() {
        this.props.checkUserConnected()
    }
    
    /**
    * Update state when user change form value
    *
    * @memberof Signin
    */
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    /** 
     * Submit login form
     * 
     * @memberof Signin
     */
    handleSubmit = event => {
        event.preventDefault();
        this.props.userLoginFetch( this.state )
    }
    
    /**
     * Render Component
     *
     * @returns
     * @memberof Signin
     */
    render() {
        // Redirect when loggedIn
        if ( this.props.loggedIn ) {
			return <Redirect to={`/products`} />
        }
        
        return (
            <Container>
				<Row>
					<Col md={4}></Col>
					<Col md={4}>
						<h1>Connexion</h1>
						<Form onSubmit={this.handleSubmit}>
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control name="email" type="email" placeholder="example@betaremit.com" value={this.state.email} onChange={this.handleChange}></Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Mot de passe</Form.Label>
								<Form.Control name="password" type="password" placeholder="Mot de passe" value={this.state.password} onChange={this.handleChange}></Form.Control>
							</Form.Group>
						    <Button type="submit" variant="info">Connexion</Button>
                            { (this.props.error) ? 'Veuillez verifier et rééssayer' : null }
						</Form>
                        <br/>
                        <Link to={`/sign-up`}>
                            S'inscrire
                        </Link>
					</Col>
				</Row>
			</Container>
        )
    }
}

/**
 * Get Global State
 * @param {*} state 
 */
const mapStateToProps = ( state ) => {
	return { 
		error: 		state.user.error,
		loggedIn: 	state.user.loggedIn
	}
}
    
/*
 * Map Actions
 */
const mapDispatchToProps = dispatch => ({
    userLoginFetch: userInfo => dispatch( userLoginFetch( userInfo ) ),
    checkUserConnected: () => dispatch( checkUserConnected() )
})
    
export default connect(mapStateToProps, mapDispatchToProps)(Signin);