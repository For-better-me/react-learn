import React, { Component } from 'react';
import Layouts from './components/Layouts/'
import { connect} from 'react-redux'
class App extends Component {
    constructor(props) {
        super(props)//必须super（） 才能在此处获取到this
        if (!this.props.user) {
            this.props.history.push('/login')
        }
    }
    render() {
        return (
            <div>
                <Layouts />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: sessionStorage.user ? JSON.parse(sessionStorage.user): state.user
    }
}
export default connect(mapStateToProps)(App);