/**
 * Created by Wanhui on 4/20/18.
 */

import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import '../css/login.css'
import axios from 'axios';
import ReactDOM from "react-dom";
import TextBox from './TextBox';
import Navbar from './Navbar';
import { Container, Form, Popup, Button, Header, Image, Modal } from 'semantic-ui-react'
import SignUp from './Signup';

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
                open: 0
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

        return (
            <div className="App">
                <div>
                <header className="App-header">
                    <h3 className="App-title">Peterbook</h3>
                </header>
                </div>
        <Grid style={{marginTop: '0px'}} columns={16} divided='vertically' className="text_board">
                <Grid.Column mobile={14} computer={9} style={{height: '85%'}}>
                    <Grid.Row className ='text_box text_font'>
                        <TextBox header={this.state.header_privacy} text={this.state.msg_privacy}/>
                    </Grid.Row>
                    <Grid.Row style={{height: '25%'}} className ='text_font'>
                        <TextBox header={this.state.header_security} text={this.state.msg_security}/>
                    </Grid.Row>
                    <Grid.Row style={{height: '25%'}} className ='text_font'>
                        <TextBox header={this.state.header_freedom} text={this.state.msg_freedom}/>
                    </Grid.Row>
                </Grid.Column>

            <Grid.Column mobile={14} computer={5}  verticalAlign='middle' className="login_box" style={{height: '55%'}}>
                    <h2 className="ui form_header centered">
                        <div className="content mid_text">
                            Log-in to your account
                        </div>
                    </h2>
                <Container style={{width: '400px', marginTop: '2em', marginBottom: '2em'}}>
                    <Form size='huge'>
                        <Form.Input
                            fluid icon='user' iconPosition='left' placeholder='Username'
                            onChange={(e, {value})=> this.setState({username: value})}
                        />
                        <Form.Input
                            fluid icon='lock' iconPosition='left' placeholder='Password' type='password'
                            onChange={(e, {value})=> this.setState({password: value})}
                        />
                    </Form>
                </Container>
                    <Button positive icon='checkmark' content="Log In" labelPosition='right' onClick={this.handleSubmit} />
                    <Button color='grey' icon='genderless' labelPosition='right' content='Sign up' onClick={()=>this.setState({open: 1})} />
            </Grid.Column>
            </Grid>
                <SignUp open={this.state.open === 1} onClose={()=> this.setState({open: 0})}/>
            </div>
        );
    }
}

export default Login;