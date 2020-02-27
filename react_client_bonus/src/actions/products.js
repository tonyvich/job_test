import { appConfig } from '../confi'

/**
 * Simple utility for good request
 *
 * @memberof ProductCreate
 */
const encodeFormData = (data ) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
}

/**
 * Create Product Action
 * @param {*} product 
 */
export const createProduct = product => {
    
    return dispatch => {
        return fetch( 
            appConfig.apiUrl + '/product',
            {
                method: 'POST',
                body:   encodeFormData( product ),
                headers: { 
                    'Content-Type':     'application/x-www-form-urlencoded',
                    'Accept':           'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem( 'token' )
                }
            }
        ).then( ( result ) => {
             dispatch( productMovement( false ) )   
        }).catch( ( e ) => {
            dispatch( productMovement( true ) )
        })
    }

}

const productMovement = ( errorRegistered ) => ({
    type: 'PRODUCT_MOVEMENT',
    error: errorRegistered 
})

/**
 * List Product Action
 */
export const listProduct = () => { 
    return dispatch => {
        return fetch( 
            appConfig.apiUrl + '/products',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem( 'token' )
                }
            } 
        )
        .then( result => result.json() )
        .then( (data) => {
            dispatch( productsFetched( data, false ) )
        })
        .catch( 
            dispatch( productsFetched( [], true) )
        );
    }
}

const productsFetched = ( products, errorRegistered ) => ({
    type: 'PRODUCTS_FETCH',
    payload: products, 
    error: errorRegistered
})

/**
 * Delete Product Action
 */

export const deleteProduct = ( productId ) => {
    return dispatch => {
        return fetch( 
            appConfig.apiUrl + '/product/' + productId,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem( 'token' )
                }
            }
        ).then( ( result ) => {
            productMovement( false );
        }).catch(
            productMovement( true )
        )
    }
}

/**
 * Edit product action
 */

export const editProduct = ( id, product) => {
    return dispatch => {
        return fetch( 
            appConfig.apiUrl + '/product/' + id,
            {
                method: 'POST',
                body:   encodeFormData( product ),
                headers: { 
                    'Content-Type':     'application/x-www-form-urlencoded',
                    'Accept':           'application/json',
                    'Authorization':    'Bearer ' + localStorage.getItem( 'token' )
                }
            }
        ).then( () => {
            dispatch( productMovement( false ) );
        }).catch( () => {
            dispatch ( productMovement( true ) );
        })
    }   
}

/** 
 * Get Product
*/
export const getProduct = ( id ) => {
    return dispatch => {
        console.log( 'call' );
        return fetch( 
            appConfig.apiUrl + '/product/' + id,
            {
                method: 'GET',
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem( 'token' )
                }
            } 
        )
        .then( result => result.json() )
        .then( ( data ) => {
            dispatch( productFetch( data, true ))
        })
        .catch( productFetch( {}, false ) );
    }
}

const productFetch = ( product, errorRegistered ) => ({
    type: 'PRODUCT_FETCH',
    payload: product, 
    error: errorRegistered
})
