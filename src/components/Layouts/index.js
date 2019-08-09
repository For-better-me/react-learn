import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import SiderMenu from '../sider';
import BrowseRecord from '../browseRecord';
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
                    <SiderMenu />
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
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                        }}
                    >
                        {this.props.container}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Layouts;