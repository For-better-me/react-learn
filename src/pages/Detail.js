import React, { Component } from 'react';
import B from './Base'
class Detail extends B {
    constructor(){
        super()
       
    }
    componentDidMount() {
        console.log('detail')
    }
    
    render() {
        console.log('detail--render')
        return (
            <div>
                detail
            </div>
        );
    }
}

export default Detail;