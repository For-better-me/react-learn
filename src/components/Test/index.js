import React, { Component } from 'react';
import { Table} from 'antd';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count:props.count
        }
        
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            count: nextProps.count
        })
    }
    clickChange = (data)=>{
        let { count} = this.state
        this.setState({
            count: count+1
        })
       
        // this.props.data[0].name='---------------------xiao'//神奇？？？？？？？？
        // this.props.onDetele()//必须结核着才会改变，是因为 没有render，实际上他已经改变了父组件的数据
    }
    render() {
        return (
            <div>
                <button onClick={this.clickChange}>change</button>
                <p>{this.state.count}</p>
            </div>
        );
    }
}

export default Test