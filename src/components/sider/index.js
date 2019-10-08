import React, { Component} from 'react';
import { Layout, Menu, Icon } from 'antd';
import { NavLink, withRouter} from 'react-router-dom';//withRouter监听路由变化的,非路由组件获取不到路由信息
import './index.scss'
import {CommonApi} from '../../api/common'
import { setRouteRecord, setTest } from '../../store/action'
import {connect} from 'react-redux'
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

class SiderMenu extends Component {
    state = {
        selectedKey:'1',
        openKey:'',
        menu:[],
    };
    
    componentWillMount() {
        this.getMenu()
    }
    componentDidMount() {
        this.props.history.listen((res) => {
            if(res.pathname != '/login'){
                this.routeChange(res)
            }
            
        })
    }
    // 动态路由怎么做呢？？？？？？？？
    getMenu(){
        const { user, location } = this.props
        CommonApi.menu(2).then(res => {
            this.routeHigh(location.pathname, res.message)
            this.setState({
                menu: res.message
            })
        })
    }
    routeHigh(path,menu=[]){
        let self = this
        let route = new Set()
        outer:
        for(let i = 0;i<menu.length;i++){
            if (menu[i].children && menu[i].children.length>0){
                let list = menu[i].children;
                for (let j = 0; j < list.length; j++) {
                    if (path == list[j].path) {
                        route.add(list[j])
                        self.setState({
                            selectedKey: list[j].menuId,
                            openKey: menu[i].menuId
                        })
                        break outer
                    }
                }
            } else{
                if (path == menu[i].path) {
                    route.add(menu[i])
                    self.setState({
                        selectedKey:menu[i].menuId
                    })
                    break;
                }
            }
            
        }
        self.props.setBrowse(route)
    }
    routeChange(res){
        if (res.state){
            this.setState({
                selectedKey: res.state.id
            })
        }
        

    }
    NavLink(item){
        let { browseList,test,user } = this.props
        let a = new Set([...browseList])
        const location = {
            pathname: item.path,
            state: { title: item.pageName, id: item.menuId }
        };
        a.add(item)//???????????????
        this.props.setBrowse(a)
        this.props.history.push(location)

    }
    generateMenus = data =>{
        return data.map(item=>{
            if(item.children && item.children.length>0){
                return(
                    <SubMenu
                        key={item.menuId}
                        title={
                            <span>
                                <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
                                <span>{item.pageName}</span>
                            </span>
                        }
                    >
                        {
                            
                            item.children.map(el=>{
                                const location = {
                                    pathname: el.path,
                                    state: { title: el.pageName,id:el.menuId }
                                };
                                return (<Menu.Item key={el.menuId} onClick={this.NavLink.bind(this, el)}><span>{el.pageName}</span></Menu.Item>)
                            })
                        }
                    </SubMenu>
                )
            } else{
                const location = {
                    pathname: item.path,
                    state: { title: item.pageName, id: item.menuId}
                };
                return (
                    <Menu.Item key={item.menuId} title={item.pathName} onClick={this.NavLink.bind(this, item)}>
                        <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
                        <span>{item.pageName}</span>
                    </Menu.Item>
                )
            }
            
        })
    }
    render() {
        const {location}  = this.props
        const { menu, selectedKey, openKey}  = this.state
        return (
            <Menu theme="dark" mode="inline" selectedKeys={[`${selectedKey}`]} defaultOpenKeys={[`${openKey}`]}>
                {this.generateMenus(menu)}
            </Menu>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        browseList: state.routesList,
        test:state.test
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setBrowse: (routes) => dispatch(setRouteRecord(routes)),
        setTest: (test) => dispatch(setTest(test))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SiderMenu));