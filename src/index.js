'use strict';

//import 'core-js/fn/object/assign';
import React from 'react';
//import ReactDOM from 'react-dom';
const render = require('react-dom').render;
import Landing from './components/Landing';
import Search from './components/SearchResults';
import { Router, Route, Link, browserHistory } from 'react-router'

// Render the main component into the dom


const routes = (<Router history={browserHistory}>
<Route path="/" component={Landing}/>
    <Route path="search" component={Search}/>
</Router>)

render( routes


, document.getElementById('root'));

module.exports = routes;
