import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './index.css';
import Login from './components/login';
import Admin from './components/admin';
import AuthServices from './utils/AuthServices';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <BrowserRouter>
        {
            AuthServices.isLoggedIn() ?
                <Switch>
                    <Route path='/' component={Admin}/>
                </Switch>
                :
                <Switch>
                    <Route path='/' component={Login}/>
                </Switch>
        }
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
