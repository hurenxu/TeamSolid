import React, { Component } from 'react';
import '../css/App.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hello Team Solid</h1>
        </header>
        <form action="/insert" className="form" method="post">
          <input type="text" name="name" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default App;
