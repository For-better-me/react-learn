import React, { Component} from 'react';
import { Layout, Menu, Icon } from 'antd';
import { NavLink, withRouter} from 'react-router-dom';//withRouter监听路由变化的,非路由组件获取不到路由信息
import './index.scss'
const { Header, Sider, Content } = Layout;

class SiderMenu extends Component {
    state = {
        site:'menu'
    };
    generateMenus = data =>{
        return data.map(item=>{
            const location = {
                pathname: item.path,
                state: { title: item.title }
            };
            return (
                <Menu.Item key={item.id} title={item.title}>
                    <NavLink to={location}>
                        <Icon type={item.icon} />
                        <span>{item.name}</span>
                    </NavLink>
                </Menu.Item>
            )
        })
    }
    render() {
        const {location}  = this.props
        const routes = [
            {
                id:'1',
                name:'Users',
                title:'用户',
                path:'/home',
                icon:'user'
            },
            {
                id: '2',
                name: 'Forms',
                title:'表单',
                path: '/detail',
                icon: 'smile'
            },
            {
                id: '3',
                name: 'Render',
                title: '表单',
                path: '/render',
                icon: 'smile'
            }
        ]
        const selectedKey = routes.find(item=>{
            if (location.pathname.indexOf(item.path) == -1){
                return routes[0]
            }
            return location.pathname.indexOf(item.path) > -1
        })
        
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedKey.id]}>
                {this.generateMenus(routes)}
            </Menu>
        );
    }
}

export default withRouter(SiderMenu);