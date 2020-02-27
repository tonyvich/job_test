// Imports
import React, { Component }             from 'react'
import { Row, Col, Form, Button }       from 'react-bootstrap'
// App imports
import Layout                           from '../../globals/Layout';
// Redux
import { editProduct, getProduct }      from '../../../actions/products';
import { connect }                      from 'react-redux';

/**
 * Provide interface for product editing
 *
 * @class ProductEdit
 * @extends {Component}
 */
class ProductEdit extends Component {

    state = { product : {} }

    /**
     * Load product to modify before rendering the view
     *
     * @memberof ProductEdit
     */
    componentDidMount = () => {
        let id  = this.props.match.params.id;
        this.props.getProduct( id ).then(
            () => {
                this.setState({ product: this.props.product })
            }
        );                
    }
    
    /**
     * Render Component
     *
     * @returns
     * @memberof ProductEdit
     */
    render () {
        return (
            <Layout>
                <Row>
                    <Col md={12} style={{paddingTop: '5px', paddingBottom: '5px' }}>
                        <h4>Modifier le produit</h4>
                    </Col>
                    <Col md={3}>
                    </Col>
                    <Col md={6}>
                        <Form onSubmit={this.onFormSubmit}>
                            <Form.Group>
                                <Form.Label>Nom</Form.Label>
                                <Form.Control type="text" id="name" defaultValue={ this.state.product.name || '' } required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Type</Form.Label>
                                <Form.Control type="text" id="type" defaultValue={ this.state.product.type || '' } required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Prix</Form.Label>
                                <Form.Control type="number" id="price" required defaultValue={ this.state.product.price  || '' }></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Note</Form.Label>
                                <Form.Control type="number" id="rating" required defaultValue={ this.state.product.rating || '' }></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Garantie</Form.Label>
                                <Form.Control type="number" id="warranty_years" required defaultValue={ this.state.product.warranty_years || '' }></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Check type="checkbox" label="Available" id="available" defaultChecked={this.state.product.available}/>
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
        let id  = this.props.match.params.id;
        let product = {
            name:               event.target.name.value,
            type:               event.target.type.value,
            price:              event.target.price.value,
            rating:             event.target.rating.value,
            warranty_years:     event.target.warranty_years.value,
            available:          ( event.target.available.checked ) ? true : false
        }
        // Save
        this.props.editProduct( id, product ).then(
            () => {
                if( this.props.error ) {
                    alert( 'Une erreur s\'est produite' );
                } else {
                    alert( 'Le produit a été correctement modifié' );
                }
            }
        );
    }
}

/**
 * Get Global State
 * @param {*} state 
 */
const mapStateToProps = ( state ) => {
	return { 
		error: 	    state.product.error,
		product: 	state.product.product
	}
}

/**
 * Get Action
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => ({
	editProduct: (id, product) => dispatch( editProduct( id, product ) ),
	getProduct: ( id ) => dispatch( getProduct( id ) ),
})

export default connect( mapStateToProps, mapDispatchToProps)( ProductEdit );