import React, { Component } from 'react';
import  Test from '../components/Test';

class Detail extends Component {
    constructor(props){
        super(props)
        this.dataSource =  [
            {
                key: '1',
                name: '胡彦斌111',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖2222',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ]
        this.state = {
           count:0
        }
    }
   
    componentDidMount() {
        // this.flash()
       
        console.log(window,333333333)
    }
    deleteHandle=()=>{
       

    }
    changeCount = () => {
        const { count } = this.state;
        window.location.href = "http://get.adobe.com/cn/flashplayer/";
        this.setState({
            count:count+1
        })
      
    }
    // flash(){
    //     var swf;
    //     if (typeof window.ActiveXObject != "undefined") {
    //         // swf = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
    //     } else {
    //         swf = navigator.plugins['Shockwave Flash'];
    //     }
    //     return swf ? true : false;
    // }
    
    render() {
        const { count } = this.state;
        return (
            <div>
                <p onClick={this.changeCount}>{count}</p>
                <Test count={count} onDetele = {this.deleteHandle}></Test>
                <Test count={count} onDetele={this.deleteHandle}></Test>
                 
            </div>
        );
    }
}

export default Detail;