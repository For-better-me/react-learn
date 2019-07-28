import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header'
class Home extends Component {
    // constructor(props) {
    //     super(props);


    // }
    state = {
        name: 'www',
        age: 12
    }
    state_2 = {
        sex: 's'
    }
    componentWillMount = () => {
        console.log(super.prototype)
        // this.setState({
        //     name:this.state.age
        // })
    }

    componentDidMount() {
        this.try()
        console.log('componentDidMount', this, this.props)
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

    changeInput(event) {
        console.log(event.target)
        this.setState({
            name: event.target.value
        })
    }
    setPropP = (value) => {
        this.setState({
            name: value
        })
    }
    try() {
        console.log(this, 'try')
    }
    render() {
        return (
            <div ref='root'>
                <Header text={this.state.name} setProp={this.setPropP} >
                    {/* <h1 className="Dialog-title">
                        Welcome
                    </h1> */}
                    left = '<div>i am child-left</div>'
                </Header>
                <Header text='所爱隔山海，山海皆可平' setProp={this.setPropP} />
                <Header text={this.state.name} setProp={this.setPropP} />
                Home{this.state.name}{new Date().toLocaleTimeString()}
                <input value={this.state.name} onChange={this.changeInput.bind(this)} />
            </div>
        );
    }
}

Home.propTypes = {

};

export default Home;