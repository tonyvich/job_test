const initialState = {
    products:   [],
    product:    {},
    error:      false,
}

export default function product( state = initialState, action ) {
    
    switch (action.type) {
        case 'PRODUCT_MOVEMENT': {
            return {...state, error: action.error }
        }
        case 'PRODUCTS_FETCH':
            return {...state, products: action.payload, error: action.error }
        case 'PRODUCT_FETCH':
            console.log( state );
            return {...state, product: action.payload, error: action.error }
        default:
            return state;
    }

}