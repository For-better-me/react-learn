import React, { Component } from 'react';

class Header extends Component {
    constructor(props){
        super(props)
        console.log(this,props)
    }
    render() {
        return (
            <div>
                <p>{this.props.text}</p>
                i am header
            </div>
        );
    }
}

export default Header;