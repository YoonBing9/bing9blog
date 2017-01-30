import React from 'react';

class App extends React.Component {
    render(){

        return (
                <div>
                  <div>Manager App</div>
                  { this.props.children }
                </div>
        );
    }
}

export default App;
