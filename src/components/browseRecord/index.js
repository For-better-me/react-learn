import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom'
import { setRouteRecord } from '../../store/action'
import './index.scss'
import { Icon, message } from 'antd';
import PropTypes from 'prop-types';
const mapStateToProps = (state) => {
    console.log('state',state)
    return {
        browseList: state.routesList,
        state: state,
        test: state.test
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        setBrowse: (routes) => dispatch(setRouteRecord(routes))
    }
}
class BrowseRecord extends Component {
    constructor(props) {
        super(props);
        this.state={
            browseList:[]
        }

    }
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }
    componentDidMount() {
     
        
    }
    componentDidUpdate(prevProps, prevState) {
    }
    deleteRecord(item,i){
        let browseList = Array.from(this.props.browseList)
        let { location,history } = this.props;
        if (browseList.length == 1){
            this.$showToast.warn('这是最后一页，不能再关闭了哦！')
            return;
        }
        browseList.splice(i, 1)
        this.props.setBrowse(new Set(browseList))
        if (location.pathname == item.path){
            let route = browseList[browseList.length - 1]
            const locationInfo = {
                pathname: route.path,
                state: { title: route.pageName, id: route.menuId }
            };
            history.push(locationInfo)
        }
        
    }
    render() {//withRouter ---- 路由变化就执行
        let {location } = this.props;
        let browseList = Array.from(this.props.browseList)//将Set类型转化成array
        return (
            <div className='browse_wrap'>
                {
                    browseList.map((item, i) => {
                        const locationInfo = {
                            pathname: item.path,
                            state: { title: item.pageName, id: item.menuId }
                        };
                        return <li key={i} className={location.pathname === item.path ? 'on' : ''}><NavLink to={locationInfo}>{item.pageName}</NavLink><Icon type="close" onClick={this.deleteRecord.bind(this,item,i)}/></li>
                    })
                }
            </div>
        );
    }
}
BrowseRecord = withRouter(BrowseRecord)
export default connect(
    mapStateToProps, mapDispatchToProps
)(BrowseRecord);