import React, { Component } from 'react';
import Login from './Login'
import Crud from './Crud'
import Main from './Main'
import Colorpicker from './Colorpicker'

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
    this.setState((prevState) => ({
      email: in_email,
      password: in_password
    }));

    this.setState((prevState) => ({
      isLoginPage: !prevState.isLoginPage
    }));
  }

  handleCrudLoginSwap() {
    this.setState((prevState) => ({
      isLoginPage: !prevState.isLoginPage
    }));
  }


  render() {
    const loginPage = <Login onSubmitClicked={this.handleLoginCrudSwap} />;
    const crudPage = <Crud email={this.state.email} password={this.state.password} onBackClicked={this.handleCrudLoginSwap}/>;

    return (
      <div className="App">
        <div>
          <header className="App-header">
            <h1 className="App-title">PeterBook</h1>
          </header>
        </div>
        <Main></Main>
      </div>
    );
  }
}
export default App;
