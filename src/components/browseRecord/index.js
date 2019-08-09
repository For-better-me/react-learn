import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom'
import { setRouteRecord } from '../../store/action'
import './index.scss'
import { Icon } from 'antd';
import PropTypes from 'prop-types';
const mapStateToProps = (state) => {
    return {
        browseList: state.routesList
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

    }
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }
    componentDidMount() {
        
        this.props.history.listen((res) => {
            this.routeChange(res)
        })
        
    }
    componentDidUpdate(prevProps, prevState) {
    }
    
    routeChange(res){
        let {location} = this.props;

    }
    render() {//路由变化就执行
        let { browseList } = this.props;
        let { location } = this.props;
        return (
            <div className='browse_wrap'>
                {
                    browseList.map((item, i) => {
                        return <li key={i} className={location.pathname === item.path?'on':''}><NavLink to={item.path}>{item.name}</NavLink><Icon type="close" /></li>
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