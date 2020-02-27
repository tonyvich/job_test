// Imports
import React, { Component }         from 'react'
import { Row, Col, Form, Button }   from 'react-bootstrap'
import Product                      from '../../../interface/product';
import * as Config                  from '../../../conf';

/**
 * Display interface for storing product
 *
 * @class ProductCreate
 * @extends {Component}
 */
export default class ProductCreate extends Component {

    /**
     * Render Component
     *
     * @returns
     * @memberof ProductCreate
     */
    render () {
        return (
            <div>
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
            Config.AppConfig.API.url + '/product',
            {
                method: 'POST',
                body:   this.encodeFormData( product ),
                headers: { 
                    'Content-Type':     'application/x-www-form-urlencoded',
                    'Accept':           'application/json'
                }
            }
        ).then( ( result: any ) => {
            alert( 'Le product a été correctement enregistré' )    
        })
    }
}