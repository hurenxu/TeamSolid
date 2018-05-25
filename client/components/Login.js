/**
 * Created by Wanhui on 4/20/18.
 */

import React, {Component} from 'react';
import {Button, Grid} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import '../css/login.css'
import axios from 'axios';
import ReactDOM from "react-dom";
import TextBox from './TextBox';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                id: -1,
                email: '',
                password: '',
                buttonText: 'Login',
                msg_show: 'New to us?',
                msg_link: 'Sign Up',
                header_privacy: 'Decentralization',
                header_security: 'Security',
                header_freedom: 'Freedom',
                msg_privacy: 'You choose who can see your data.',
                msg_security: 'All data are encrypted to make them safe.',
                msg_freedom: 'Your identity is not controlled and observed.',
            };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);

  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    if (validateEmail(this.state.email) && this.state.password != '' && this.state.buttonText === 'Login') {
      //Submit to somewhere
      this.props.onSubmitClicked();
      axios.post(`/insert`, {email: this.state.email, password: this.state.password})
    }
    else if (validateEmail(this.state.email) && this.state.password != '' && this.state.buttonText === 'Sign Up') {
      //Submit to somewhere
      console.log("Try to sign up")
    }
    else if (this.state.password == '') {
      alert('Password cannot be empty');
    }
    else {
      alert('Invalid email address');
    }
    this.setState({
      email: ''
    });
  }

  handleClick(event) {
    //Register
    if (this.state.buttonText === 'Sign Up') {
      this.setState({
        buttonText: 'Login',
        msg_show: 'New to Us?',
        msg_link: 'Sign Up',
      });
    }
    else {
      this.setState({
        buttonText: 'Sign Up',
        msg_show: 'Already have an account?',
        msg_link: 'Sign In'
      });
    }
  }

  render() {
    const Mobile = props => <Responsive {...props} maxWidth={767}/>;
    const Default = props => <Responsive {...props} minWidth={768}/>;
     /* var NewComponent = React.createClass({
          render: function() {
              return (

                  <div style="box-sizing: border-box; display: block; font-size: 16px !important;min-width: 1020px; word-wrap: break-word;
                      font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
                      line-height: 1.5;color: #24292e;background-color: #fff;">
                      <div>
                          <div >
                              <div >
                              </div>
                          </div>
                      </div>
                  </div>
              );
          }
      });*/
        return (
                <div className="App">
                    <header className="loginpage_header">
                                 <h3 className="App-title">Hello Team Solid</h3>
                    </header>
        <Grid columns={16} divided='vertically' className="text_board">
                <Grid.Column mobile={14} computer={9} style={{height: '85%'}}>
                    <Grid.Row className ='text_box'>
                        <TextBox header={this.state.header_privacy} text={this.state.msg_privacy}/>
                    </Grid.Row>
                    <Grid.Row style={{height: '33%'}}>
                        <TextBox header={this.state.header_security} text={this.state.msg_security}/>
                    </Grid.Row>
                    <Grid.Row style={{height: '33%'}}>
                        <TextBox header={this.state.header_freedom} text={this.state.msg_freedom}/>
                    </Grid.Row>
                </Grid.Column>

            <Grid.Column mobile={14} computer={5}  verticalAlign='middle' className="login_box" style={{height: '40%'}}>
                    <h2 className="ui form_header centered">
                        <div className="content mid_text">
                            Log-in to your account
                        </div>
                    </h2>
                    <form onSubmit={this.handleSubmit} method="post" className="ui massive form login_form">
                        <div className="ui stacked secondary  segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"/>
                                    <input type="text" value={this.state.email} onChange={this.handleChange}
                                           name="email" placeholder="E-mail"/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"/>
                                    <input type="password" value={this.state.password}
                                           onChange={this.handleChange}
                                           name="password" placeholder="Password"/>
                                </div> 
                            </div>
                            <Button type='submit' className="ui fluid huge teal larg_text"
                                    secondary>{this.state.buttonText}</Button>
                        </div>
                        <div className="ui error message"/>
                    </form>
                    <div className="ui message massive">
                        {this.state.msg_show} <a href="#" onClick={this.handleClick}>{this.state.msg_link}</a>
                    </div>

                </Grid.Column>
            </Grid>
                </div>
        );
    }
}

export default Login;