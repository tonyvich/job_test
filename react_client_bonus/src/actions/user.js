import { appConfig } from "../confi"

/**
* ACTION post signing up user
* @param {*} user 
*/
export const userPostFetch = user => {
    return dispatch => {
        return fetch( appConfig.apiUrl + '/users', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept':       'application/json',
            },
            body: JSON.stringify( user )
        })
        .then(resp => resp.json())
        .then(data => {
            localStorage.setItem("token", data.token)
            dispatch( loginUser( data.user, false, true ) )
        }).catch( e => {
            console.log( e );
            dispatch( loginUser( {}, true, false ))
        })
    }
}

const loginUser = ( user, errorRegistered, loggedIn ) => ({
    type: 'LOGIN_USER',
    payload: user,
    error: errorRegistered,
    loggedIn: loggedIn
})

/**
 * ACTION Log user in ( Dispatch the same action as user signing up)
 * @param {*} user 
 */
export const userLoginFetch = user => {
    return dispatch => {
        return fetch( appConfig.apiUrl + '/users/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( user )
        })
        .then(resp => resp.json())
        .then(data => {
            if( data.user === undefined ){
                dispatch( loginUser( {}, true, false ) )
            } else {
                localStorage.setItem("token", data.token)
                dispatch( loginUser( data.user , false, true ) )
            }
        }).catch( ( e ) => {
                console.log( e );    
                dispatch( loginUser( {}, true, false ) )
            } 
        )
    }
}

export const logoutUser = () => ({
    type: 'LOGOUT_USER'
});

/** 
 * Check User Connected
*/
export const checkUserConnected = () => {
    return dispatch => { 
        if( localStorage.getItem( 'token' ) !== null ) {
            dispatch( checkUser( true ) );
        } else {
            dispatch( checkUser( false ) );
        }
    }
}

export const checkUser = ( connected ) => ({
    type: 'CHECK_USER_CONNECTED',
    loggedIn: connected
})