/**
 * User Reducer
 */

const initialState = {
    currentUser:        {},
    error:              false,
    loggedIn:           false 
}

/**
 * User Reducer
 * @param {*} state 
 * @param {*} action 
 */
export default function user( state = initialState, action ) {
    
    switch (action.type) {
        case 'LOGIN_USER':
            return {...state, currentUser: action.payload, error: action.error, loggedIn: action.loggedIn }
        case 'LOGOUT_USER':
            return {...state, currentUser: {}, loggedIn: false }
        case 'CHECK_USER_CONNECTED':
            return {...state, loggedIn: action.loggedIn }
        default:
            return state;
    }

}