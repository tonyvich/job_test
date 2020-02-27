import React            from 'react';
import ReactDOM         from 'react-dom';
import './index.css';
import App              from './App';

// Redux
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider }     from 'react-redux'
import thunk            from 'redux-thunk'
import rootReducer      from './reducers/root'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Redux Store
 */
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk)
    )
)

/**
 * React Render
 */
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,document.getElementById('root')
);
