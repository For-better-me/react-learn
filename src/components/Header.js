import React, { Component } from 'react';

class Header extends Component {
    constructor(props){
        super(props)
        console.log(props)
        
    }
    changeInput = ()=>{
        
    }
    setProp = (e)=>{
        this.props.setProp(e.target.value)
    }
    render() {
        return (
            <div>
                <p>{this.props.text}</p>
                <input value={this.props.text} onChange={this.setProp} />
                {this.props.left}
                i am header
            </div>
        );
    }
}

export default Header;