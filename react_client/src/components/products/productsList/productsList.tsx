// Imports
import React, { Component } from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Product from './../../../interface/product'
import * as Config from '../../../conf';
import socketIOClient from 'socket.io-client'

interface IProps {
    title: string;
}

interface IState {
    products: Array<Product>
}

export default class ProductsList extends Component<IProps, IState, Product> {

    readonly state = { products: [] }
    
    /**
     * Load products after compnent mounted
     */
    componentDidMount() {
        fetch( Config.AppConfig.API.url + '/products' )
        .then( result => result.json() )
        .then( (data) => {
            this.setState({ products: data })
        })
        .catch( console.log );

        // Reload list on socket io signal
        const socket = socketIOClient( Config.AppConfig.API.url );
        socket.on(
            "reloadProducts",
            ( data: any ) => {
                this.setState({ products: data })
            }
        )
    }
    
    /**
     * Render Component
     */
    render () {
        return (
            <div>
                <Row>
                    <Col md={12} style={{paddingTop: '40px', paddingBottom: '40px' }}>
                        <h4>Liste des produits</h4>
                    </Col>
                    <Col md={12}>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Type</th>
                                    <th>Prix</th>
                                    <th>Note</th>
                                    <th>Garantie</th>
                                    <th>Disponible</th>
                                    <th colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.products.map((value:Product, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{value.name}</td> 
                                            <td>{value.type}</td> 
                                            <td>{value.price}</td> 
                                            <td>{value.rating}</td> 
                                            <td>{value.warranty_years}</td> 
                                            <td>{ ( value.available ) ? 'Oui' : 'Non' }</td> 
                                            <td>
                                                <Link to={`/product/edit/${value._id}`}>
                                                    Modifier
                                                </Link>
                                            </td>
                                            <td>
                                                <Button variant="danger" onClick={this.deleteProduct.bind(this, value._id)}>Supprimer</Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>            
        )
    }

    /**
     * Provide logic for product deletion
     *
     * @memberof ProductsList
     */
    deleteProduct = ( productId: any ) => {
        fetch( 
            Config.AppConfig.API.url + '/product/' + productId,
            {
                method: 'DELETE',
            }
        ).then( ( result: any ) => {
            alert( 'Le product a été correctement Supprimé' )    
        })
    }
}

