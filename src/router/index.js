import React from 'react';
import Home from '../pages/Home.js';
import Detail from '../pages/Detail.js';
import {HashRouter,NavLink,Route,Switch} from 'react-router-dom';

const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/detail" component={Detail}/>
        </Switch>
    </HashRouter>
);


export default BasicRoute;