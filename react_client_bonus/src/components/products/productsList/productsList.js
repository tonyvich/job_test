// Imports
import React, { Component } from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import { appConfig } from '../../../confi'
import Layout from '../../globals/Layout'

// Redux
import { connect } from 'react-redux';
import { listProduct, deleteProduct } from '../../../actions/products';

class ProductsList extends Component {

    state = {
        products : []
    }

    /**
     * Load products after compnent mounted
     */
    componentDidMount() {
        // Load Product
        this.props.listProduct().then(
            ( data ) => {
                this.setState( { products: this.props.products } )
            }
        );

        // Reload list on socket io signal
        const socket = socketIOClient( appConfig.apiUrl );
        socket.on(
            "reloadProducts",
            ( data ) => {
                console.log( data );
                this.setState( { products: data });
            }
        )
    }
    
    /**
     * Render Component
     */
    render () {
        return (
            <Layout>
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
                                { this.state.products.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{value.name}</td> 
                                            <td>{value.type}</td> 
                                            <td>{value.price}</td> 
                                            <td>{value.rating}</td> 
                                            <td>{value.warranty_years}</td> 
                                            <td>{ ( value.available ) ? 'Oui' : 'Non' }</td> 
                                            <td>
                                                <Link to={`/products/edit/${value._id}`}>
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
            </Layout>            
        )
    }

    /**
     * Provide logic for product deletion
     *
     * @memberof ProductsList
     */
    deleteProduct = ( productId ) => {
        this.props.deleteProduct( productId );
    }
    
}

/**
 * Get Global State
 * @param {*} state 
 */
const mapStateToProps = ( state ) => {
	return { 
		products: 	state.product.products,
		error: 	    state.product.error
	}
}

/**
 * Get Action
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => ({
	listProduct: () => dispatch( listProduct() ),
	deleteProduct: productId => dispatch( deleteProduct( productId ) )
})

export default connect( mapStateToProps, mapDispatchToProps)( ProductsList );