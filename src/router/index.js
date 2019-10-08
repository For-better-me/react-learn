import React from 'react';
import App from '../App.js';
import Login from '../pages/Login.js';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from '../store' 
// Route组件不能嵌套使用，react - router 4.0 开始，路由的配置分散到各组件中
const BasicRoute = () => (
    <HashRouter>
       <Switch>
            <Provider store={store}>
                <Route path='/DXA' component={App} />
                <Route path='/login' component={Login} />
                {/* <Redirect exact to="/login" /> */}
            </Provider>
            
       </Switch>

    </HashRouter>
);


export default BasicRoute;