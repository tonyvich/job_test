
import React, { Component } 					from 'react';
import { Container, Col, Row, Form, Button } 	from 'react-bootstrap'
import { Link } 								from 'react-router-dom'
import { Redirect } 							from "react-router-dom";

// Redux
import { connect } 								from 'react-redux';
import { userPostFetch } 						from '../../actions/user';

/**
 * This component allow to signup in the app
 *
 * @class Signup
 * @extends {Component}
 */
class Signup extends Component {
	
	/**
	 * State
	 *
	 * @memberof Signup
	 */
	state = {
		name: 		"",
		email: 		"",
		password: 	"",
	}
	
	/**
	 * Update State with form value
	 *
	 * @memberof Signup
	 */
	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	
	/**
	 * Submit the Form
	 *
	 * @memberof Signup
	 */
	handleSubmit = event => {
		event.preventDefault()
		this.props.userPostFetch(this.state)
	}
	
	/**
	 * Render Component
	 *
	 * @returns
	 * @memberof Signup
	 */
	render() {
		if ( this.props.loggedIn ) {
			return <Redirect to={`/products`} />
		}

		return (
			<Container>
				<Row>
					<Col md={4}></Col>
					<Col md={4}>
						<h1>Créer un compte</h1>
						<Form onSubmit={this.handleSubmit}>
							<Form.Group>
								<Form.Label>Nom</Form.Label>
								<Form.Control name="name" type="text" placeholder="Marc TONYE" value={this.state.username} onChange={this.handleChange}></Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control name="email" type="email" placeholder="example@betaremit.com" value={this.state.email} onChange={this.handleChange}></Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Mot de passe</Form.Label>
								<Form.Control name="password" type="password" placeholder="Mot de passe" value={this.state.password} onChange={this.handleChange}></Form.Control>
							</Form.Group>
							<Button type="submit" variant="info">Enregistrer</Button>
						</Form>
						{ ( this.props.error ) ? 'Une erreur s\'est produite. Veuilez verifier et rééssayer' : null }
						<br/>
						<Link to={`/login`}>
                            Vous avez déjà un compte
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

/**
 * Get Action
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => ({
	userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})

export default connect( mapStateToProps, mapDispatchToProps)(Signup);