import React from 'react';
import App from '../App.js';
import Home from '../pages/Home.js';
import Detail from '../pages/Detail.js';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from '../store' 
const BasicRoute = () => (
    <HashRouter>
       <Switch>
            <Provider store={store}>
                <App>
                    <Route location={{ pathname: '/home', state: { title:'首页'} }} component={Home} />
                    <Route location={{ pathname: '/detail', state: { title: '详情页面' } }} component={Detail}  />
                    <Route path="/render" 
                        render={(props)=>{
                            console.log(props)
                    }
                    } />
                    <Redirect to='/home' />
                </App>
            </Provider>
            
       </Switch>

    </HashRouter>
);


export default BasicRoute;