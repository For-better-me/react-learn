import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { connect } from 'react-redux'
import { setRouteRecord } from '../store/action'
import B from './Base'

class Home extends B {
    constructor(props) {
        super(props);
        this.state = {

        }
        

    }
    componentDidMount() {
        console.log('home')
    }

    componentWillUnmount() {

    }
   
    render() {
        console.log('home--render')
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            },
        ];
        const dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '吴彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ];
        let msg
        if (true) {
            msg = (<p>i am true</p>)//（标签，组件）{js代码}
        } else {
            msg = (<p>i am false</p>)
        }
        let { routes } = this.props
        return(
            <div>0000</div>
        )
 
    }
}

Home.propTypes = {

};
const mapStateToProps = (state) => {
    return {
        routes: state.routesList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        set: (routes) => dispatch(setRouteRecord(routes))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);