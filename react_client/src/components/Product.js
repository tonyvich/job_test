import React from 'react';
import ReactDOM from 'react-dom';

/**
 * @class Product
 * This class manage the products inside the app
 */
class Product extends React.component {

    /**
     * Creates an instance of Product.
     * @param {*} props
     * @memberof Product
     */
    constructor( props ) {
        super( props );
        this.state = {
            _id:                props.id,
            name:               props.name,
            type:               props.type,
            price:              props.price,
            rating:             props.rating,
            warranty_years:     props.warranty_years,
            available:          props.available
        }
    }
    
    /**
     * Render product Component
     *
     * @returns
     * @memberof Product
     */
    render() {
        return <tr>
            <td>{ this._id }</td>
        </tr>
    }
}