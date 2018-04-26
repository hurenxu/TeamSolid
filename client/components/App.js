import React, { Component } from 'react';
import Login from './Login'
import Crud from './Crud'
import '../css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state =
        {
            isLoginPage: true,
            email: "",
            password: ""

        };

    this.handleLoginCrudSwap = this.handleLoginCrudSwap.bind(this);
    this.handleCrudLoginSwap = this.handleCrudLoginSwap.bind(this);
  }

  handleLoginCrudSwap(in_email, in_password) {
    this.setState((prevState, props) => ({
        email: in_email,
        password: in_password
    }));

    this.setState((prevState, props) => ({
        isLoginPage: !prevState.isLoginPage
    }));
  }

  handleCrudLoginSwap() {
    this.setState((prevState, props) => ({
        isLoginPage: !prevState.isLoginPage
    }));
  }


  render() {
    const loginPage = <Login onSubmitClicked={this.handleLoginCrudSwap} />;
    const crudPage = <Crud email={this.state.email} password={this.state.password} onBackClicked={this.handleCrudLoginSwap}/>;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hello Peter</h1>
        </header>
          { this.state.isLoginPage? (loginPage): (crudPage)}
      </div>
    );
  }
}
export default App;
