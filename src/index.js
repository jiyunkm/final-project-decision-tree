import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';

import App from './App';
import UserDashboard from './console/UserDashboard';
import './index.css';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

/*const route = (
    <Router>
        <Route path='/' component={<App />}>
            <Route path='console' component={<UserDashboard />} />
        </Route>
    </Router>
);*/

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
