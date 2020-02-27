// Imports
import React, { Component }         from 'react'
import { Row, Col, Form, Button }   from 'react-bootstrap'

// Redux
import { connect }                  from 'react-redux';
import { createProduct }            from '../../../actions/products';
import Layout                       from '../../globals/Layout'


/**
 * Display component for storing product
 *
 * @class ProductCreate
 * @extends {Component}
 */
class ProductCreate extends Component {

    /**
     * Render the component
     * 
     * @memberof ProductCreate
     */
    render () {
        return (
            <Layout>
                <Row>
                    <Col md={12} style={{paddingTop: '5px', paddingBottom: '5px' }}>
                        <h4>Créer un produit</h4>
                    </Col>
                    <Col md={3}>
                    </Col>
                    <Col md={6}>
                        <Form onSubmit={this.onFormSubmit}>
                            <Form.Group>
                                <Form.Label>Nom</Form.Label>
                                <Form.Control type="text" id="name" required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Type</Form.Label>
                                <Form.Control type="text" id="type" required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Prix</Form.Label>
                                <Form.Control type="number" id="price" required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Note</Form.Label>
                                <Form.Control type="number" id="rating" required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Garantie</Form.Label>
                                <Form.Control type="number" id="warranty_years" required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Check type="checkbox" label="Available" id="available" />
                            </Form.Group>
                            <Button type="submit" variant="info">Enregistrer</Button>
                        </Form>
                    </Col>
                </Row>
            </Layout>
        )
    }


    /**
     * Submit the product
     *
     * @memberof ProductCreate
     */
    onFormSubmit = ( event ) => {
        event.preventDefault();
        // Build product object
        let product = {
            name:               event.target.name.value,
            type:               event.target.type.value,
            price:              event.target.price.value,
            rating:             event.target.rating.value,
            warranty_years:     event.target.warranty_years.value,
            available:          ( event.target.available.checked ) ? true : false
        }
        // Save
        this.props.createProduct( product ).then( () => {
            if( !this.props.error ) {
                alert( 'Le produit a bien été enregistré' )
            }
        });
    }

}

/**
 * Get Global State
 * @param {*} state 
 */
const mapStateToProps = ( state ) => {
	return { 
		error: 	    state.product.error
	}
}

/**
 * Get Action
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => ({
	createProduct: product => dispatch( createProduct( product ) )
})

export default connect( mapStateToProps, mapDispatchToProps)( ProductCreate );