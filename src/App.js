import React, { Component } from 'react';
import Results from './containers/Results';

class App extends Component {
  render() {
    return (
      <div className="App text-center bg-overlay">
        <Results />
      </div>
    );
  }
}

export default App;
