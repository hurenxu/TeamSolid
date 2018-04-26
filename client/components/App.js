import React, { Component } from 'react';
import Login from './Login'
import Crud from './Crud'
import '../css/App.css';
import axios from "axios/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        isLoginPage: true,
        email: "",
        password: "",
        users: []
      };

    this.handleLoginCrudSwap = this.handleLoginCrudSwap.bind(this);
    this.handleCrudLoginSwap = this.handleCrudLoginSwap.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
  }

  handleLoginCrudSwap(in_email, in_password) {
    this.setState((prevState) => ({
      isLoginPage: !prevState.isLoginPage,
      email: in_email,
      password: in_password
    }));

    this.createNewUser(in_email, in_password);
  }

  handleCrudLoginSwap() {
    this.setState((prevState) => ({
      isLoginPage: !prevState.isLoginPage
    }));
  }

  createNewUser(in_email, in_password) {
    axios.post(`/insert`, { email: in_email, password: in_password})
      .then(res => {
        var content = res.data.map(function (item) {
          return {id: item._id, email: item.userEmail, password: item.password};
        });

        this.setState({
          users: content
        });
      });
  }

  render() {
    const loginPage = <Login onSubmitClicked={this.handleLoginCrudSwap} />;
    const crudPage = <Crud users={this.state.users} onDuplicateClicked={this.createNewUser} onBackClicked={this.handleCrudLoginSwap}/>;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hello Peter</h1>
        </header>
          {this.state.isLoginPage? (loginPage): (crudPage)}
      </div>
    );
  }
}
export default App;
