// Imports
import React, { Component }         from 'react'
import { RouteComponentProps }      from 'react-router';
import { Row, Col, Form, Button }   from 'react-bootstrap'

import { AppConfig }                from '../../../conf';
import Product                      from '../../../interface/product'

/**
 * State Interface
 *
 * @interface IState
 */
interface IState {
    product:    Product
}

/**
 * Route Params
 */
interface RouteParams {
    id?: string
}

/**
 * Display Product Edit
 *
 * @export
 * @class ProductEdit
 * @extends {Component<RouteComponentProps<RouteParams>, IState>}
 */
export default class ProductEdit extends Component<RouteComponentProps<RouteParams>,IState> {

    readonly state: any = { product: {} }

    /**
     * Load product to modify before rendering the view
     *
     * @memberof ProductEdit
     */
    componentDidMount = () => {
        let id  = this.props.match.params.id;
        fetch( AppConfig.API.url + '/product/' + id )
        .then( result => result.json() )
        .then( ( data ) => {
            this.setState({ product: data })
        })
        .catch( console.log );
    }
    
    /**
     * Render Component 
     *
     * @returns
     * @memberof ProductEdit
     */
    render () {
        return (
            <div>
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
                                <Form.Control type="number" id="price" required defaultValue={ this.state.product.price as string || '' }></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Note</Form.Label>
                                <Form.Control type="number" id="rating" required defaultValue={ this.state.product.rating as string || '' }></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Garantie</Form.Label>
                                <Form.Control type="number" id="warranty_years" required defaultValue={ this.state.product.warranty_years as string || '' }></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Check type="checkbox" label="Available" id="available" defaultChecked={this.state.product.available}/>
                            </Form.Group>
                            <Button type="submit" variant="info">Enregistrer</Button>
                        </Form>
                    </Col>
                </Row>
            </div>        
        )
    }

    /**
     * Simple utility for good request
     *
     * @memberof ProductCreate
     */
    encodeFormData = (data: any) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
    }

    /**
     * Submit the product
     *
     * @memberof ProductCreate
     */
    onFormSubmit = ( event: any ) => {
        event.preventDefault();
        // Build product object
        let id  = this.props.match.params.id;
        let product: Product = {
            name:               event.target.name.value,
            type:               event.target.type.value,
            price:              event.target.price.value,
            rating:             event.target.rating.value,
            warranty_years:     event.target.warranty_years.value,
            available:          ( event.target.available.checked ) ? true : false
        }
        // Save
        fetch( 
            AppConfig.API.url + '/product/' + id,
            {
                method: 'POST',
                body:   this.encodeFormData( product ),
                headers: { 
                    'Content-Type':     'application/x-www-form-urlencoded',
                    'Accept':           'application/json'
                }
            }
        ).then( ( result: any ) => {
            alert( 'Le product a été correctement modifié' )    
        })
    }
    
}
