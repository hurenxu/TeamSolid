import React, { Component } from 'react';
import Login from './Login'
import Crud from './Crud'
import Main from './Main'
import Colorpicker from './Colorpicker'

/**
 * This App class is the main app JavaScript component.
 * @extends {Component}
 */
class App extends Component {

    /**
     * This constructor invokes the constructor from the super class Component. It's used to initialize the
     * login page by initializing the email and password fields to default empty.
     * @param {Object} props - react component that can be modified
     */
  constructor(props) {
    super(props);

        /**
         * The member variables of the page's state include a booolean to check if it's the login page, a string
         * field for the email, and a string field for the password.
         * @type {{isLoginPage: boolean, email: string, password: string}}
         */
    this.state =
      {
        isLoginPage: true,
        email: "",
        password: ""

      };

    this.handleLoginCrudSwap = this.handleLoginCrudSwap.bind(this);
    this.handleCrudLoginSwap = this.handleCrudLoginSwap.bind(this);
  }

    /**
     * The method handleLoginCrudSwap , uses the create, read, update, and delete mechanism
     * to handle the user's input email and input password.
     * @param {string} in_email - user's input email
     * @param {string} in_password - user's input password
     */
  handleLoginCrudSwap(in_email, in_password) {
    this.setState((prevState) => ({
      email: in_email,
      password: in_password
    }));

    this.setState((prevState) => ({
      isLoginPage: !prevState.isLoginPage
    }));
  }

    /**
     * The method handleCrudLoginSwap , uses the create, read, update, and delete mechanism to restore the
     * the login back to it's original state once a user has finished loggin in.
     */
  handleCrudLoginSwap() {
    this.setState((prevState) => ({
      isLoginPage: !prevState.isLoginPage
    }));
  }


    /**
     * The render method invokes the PeterBook components that handle login page interactions with email,
     * password, and clicked items.
     * @returns {*} - the invoked Peterbook Login Page
     */
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
