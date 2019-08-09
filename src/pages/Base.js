import React, { Component } from 'react';

class Base extends Component {
    constructor(){
        super()
    }
    componentWillMount(){
        const { location} = this.props
        console.log(location.state.title)
        document.title = location.state.title
    }
   
  
}

export default Base;