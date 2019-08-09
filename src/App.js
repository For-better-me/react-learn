import React, { Component } from 'react';
import Layouts from './components/Layouts/'
class App extends Component {
    
    render() {
        return (
            <div>
                <Layouts container={this.props.children} />
            </div>
        );
    }
}

export default App;