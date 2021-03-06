import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../../pages/Home'
import Detail from '../../pages/Detail'
import _404 from '../../pages/404'
import SiderMenu from '../sider'
import BrowseRecord from '../browseRecord'
import './index.scss'
const { Header, Sider, Content } = Layout;
class Layouts extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <SiderMenu></SiderMenu>
                </Sider>
               
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <BrowseRecord></BrowseRecord>
                    <Content>
                        <Switch>
                            <Route path='/DXA/overView' component={Home} />
                            <Route path='/DXA/alarm' component={Detail} />
                            <Route path='/DXA/' component={_404} />
                            {/* <Redirect to="/DXA/overView" /> */}
                        </Switch>

                    </Content >
                </Layout >

            </Layout>
        )

    }
}


export default Layouts;