import React, { Component } from 'react';
import Login from './Login'
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hello Team Solid</h1>
        </header>
        <Login />
      </div>
    );
  }
}
export default App;
