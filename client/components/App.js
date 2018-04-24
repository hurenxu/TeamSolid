import React, { Component } from 'react';
import Login from './Login'
import Crud from './Crud'
import '../css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state =
        {
            isLoginPage: true
        };

    this.handleLoginCrudSwap = this.handleLoginCrudSwap.bind(this);
  }

  handleLoginCrudSwap() {
    this.setState((prevState, props) => ({
        isLoginPage: !prevState.isLoginPage
    }));
  }


  render() {
    const loginPage = <Login onSubmitClicked={this.handleLoginCrudSwap} />;
    const crudPage = <Crud onBackClicked={this.handleLoginCrudSwap}/>;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hello Team Solid</h1>
        </header>
          { this.state.isLoginPage? (loginPage): (crudPage)}
      </div>
    );
  }
}
export default App;
