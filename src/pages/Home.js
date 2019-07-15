import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'www'
        }

    }

    componentWillMount() {
        console.log(this,this.props)
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    // shouldComponentUpdate(nextProps, nextState) {

    // }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }
    changeData(){
        console.log(this)
        this.setState({
            name:'zhangwenjie'
        })
    }
    changeInput(event){
        console.log(event.target)
        this.setState({
            name:event.target.value
        })
    }
    render() {
        return (
            <div ref='root'>
                <Header text={this.state.name}/>
                Home{this.state.name}
                <input value={this.state.name} onChange={this.changeInput.bind(this)}/>
                {/* <button onClick={this.props.history.push('/detail')}>go detail</button> */}
                <button onClick={this.changeData.bind(this)}>change name</button>
            </div>
        );
    }
}

Home.propTypes = {

};

export default Home;