/**
 * Created by Wanhui on 4/20/18.
 */

import React, {Component} from 'react';
import {Grid, Ref} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import MediaQuery from 'react-responsive';
import '../css/login.css'
import axios from 'axios';
import ReactDOM from "react-dom";
import TextBox from './TextBox';
import Navbar from './Navbar';
import {Container, Form, Popup, Button, Header, Image, Modal} from 'semantic-ui-react'
import SignUp from './Signup';
import App from './App';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        email: '',
        password: '',
        buttonText: 'Login',
        msg_link: 'Sign Up',
        header_security: 'Security',
        header_freedom: 'Freedom',
        msg_security: 'All data are encrypted to make them safe.',
        msg_freedom: 'Your identity is not controlled and observed.',
        open: 0,
        redirect: false
      };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirPage = this.redirPage.bind(this);
    this.onclose = this.onclose.bind(this);
    this.state.redirPage = this.props.redirPage;
  }

  handleSubmit(event) {
    event.preventDefault();

    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    if (validateEmail(this.state.email) && this.state.password != '') {
      //Submit to somewhere
      axios.post('/api/login', {
        email: this.state.email,
        password: this.state.password
      }).then((response) => this.redirPage(response));
    }
    else if (!validateEmail(this.state.email)) {
      alert('Invalid email address');
    }
    else {
      alert('Password cannot be empty');
    }
  }

  redirPage(response) {
    if (JSON.parse(response.data).islogined) {
      history.pushState(null, null, '/');
      this.setState({redirect: true});
    } else {
      alert('Incorrect email or password!');
    }
  }

  onclose(event) {
    //this.setState({redirect: true});
  }

  render() {

    if (this.state.redirect) {
      return <App/>;
    }

    return (
      <div className="App">
        <div>
          <header className="App-login-header">
            <h3 className="App-title">Peterbook</h3>
          </header>
        </div>
        <Grid style={{marginTop: '-80px'}} columns={16} divided='vertically' className="text_board">
          <MediaQuery query="(max-device-width: 1224px)">
            {/*Tablet or mobile phone*/}
            <Grid.Column mobile={16} verticalAlign='middle' className="login_box"
                         style={{height: '55%', marginTop: '20%'}}>
              <h2 className="ui form_header centered">
                <div className="content mid_text">
                  Log-in to your account
                </div>
              </h2>
              <Container style={{width: '400px', marginTop: '2em', marginBottom: '2em'}}>
                <Form size='huge'>
                  <Form.Input
                    fluid icon='user' iconPosition='left' placeholder='email'
                    onChange={(e, {value}) => this.setState({email: value})}
                  />
                  <Form.Input
                    fluid icon='lock' iconPosition='left' placeholder='Password' type='password'
                    onChange={(e, {value}) => this.setState({password: value})}
                  />
                </Form>
              </Container>
              <Button positive icon='checkmark' content="Log In" labelPosition='right' onClick={this.handleSubmit}/>
              <Button color='grey' icon='genderless' labelPosition='right' content='Sign up'
                      onClick={() => this.setState({open: 1})}/>
            </Grid.Column>
          </MediaQuery>
          <MediaQuery query="(min-device-width: 1224px)">
            <Grid.Column computer={9} style={{height: '85%', marginTop: '7%'}}>
              <Grid.Row className='text_box text_font'>
                  <TextBox header={this.state.header_security} text={this.state.msg_security}/>
              </Grid.Row>
              <Grid.Row style={{height: '25%'}} className='text_font'>
                  <TextBox header={this.state.header_freedom} text={this.state.msg_freedom}/>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column computer={5} verticalAlign='middle' className="login_box"
                         style={{height: '55%', marginTop: '14%'}}>
              <h2 className="ui form_header centered">
                <div className="content mid_text">
                  Log-in to your account
                </div>
              </h2>
              <Container style={{width: '400px', marginTop: '2em', marginBottom: '2em'}}>
                <Form size='huge'>
                  <Form.Input
                    fluid icon='user' iconPosition='left' placeholder='email'
                    onChange={(e, {value}) => this.setState({email: value})}
                  />
                  <Form.Input
                    fluid icon='lock' iconPosition='left' placeholder='Password' type='password'
                    onChange={(e, {value}) => this.setState({password: value})}
                  />
                </Form>
              </Container>
              <Button positive icon='checkmark' content="Log In" labelPosition='right' onClick={this.handleSubmit}/>
              <Button color='grey' icon='genderless' labelPosition='right' content='Sign up'
                      onClick={() => this.setState({open: 1})}/>
            </Grid.Column>
          </MediaQuery>
        </Grid>
        <SignUp onclose={() => this.onclose()} open={this.state.open === 1} onClose={() => this.setState({open: 0})}/>
      </div>
    );
  }
}

export default Login;