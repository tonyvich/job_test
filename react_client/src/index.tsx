import * as React from 'react';
import * as ReactDOM from 'react-dom';
// Routing
import { BrowserRouter as Router } from 'react-router-dom';

// Redux

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// App Imports
import './index.css';
import App from './App';

ReactDOM.render(
    <Router>
        <App></App>
    </Router>, 
    document.getElementById('root')
);

