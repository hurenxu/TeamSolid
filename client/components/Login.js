/**
 * Created by Wanhui on 4/20/18.
 */

import React, {Component} from 'react';
import {Grid, Ref} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import '../css/login.css'
import axios from 'axios';
import ReactDOM from "react-dom";
import TextBox from './TextBox';
import Navbar from './Navbar';
import { Container, Form, Popup, Button, Header, Image, Modal } from 'semantic-ui-react'
import SignUp from './Signup';
import App from './App';

/**
 * The Login class is meant to accomplish functionality that will enable the returning users to log into their
 * profile.
 * @extends {Component}
 */
class Login extends Component {

    /**
     * The constructor passes a props object which is a react component that can be modified for use.
     * @param {Object} props=react_component - a react component that can be modified
     */
    constructor(props) {
        super(props);

        /**
         * The public member variables that will update the state of the React element.
         * @type {{email: string, password: string, buttonText: string, msg_link: string, header_privacy: string, header_security: string, header_freedom: string, msg_privacy: string, msg_security: string, msg_freedom: string, open: number, redirect: boolean}}
         */
        this.state =
            {
                email: '',
                password: '',
                buttonText: 'Login',
                msg_link: 'Sign Up',
                header_privacy: 'Decentralization',
                header_security: 'Security',
                header_freedom: 'Freedom',
                msg_privacy: 'You choose who can see your data.',
                msg_security: 'All data are encrypted to make them safe.',
                msg_freedom: 'Your identity is not controlled and observed.',
                open: 0,
                redirect:false
            };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirPage = this.redirPage.bind(this);
        this.onclose = this.onclose.bind(this);
        this.state.redirPage=this.props.redirPage;
  }

    /**
     * The handleSubmit method fires when a user inputs their email to log in into their social media account.
     * @param {Object} event=react_event - modifies the state of the react element
     * @type {Method}
     */
  handleSubmit(event) {
    event.preventDefault();
    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    if (validateEmail(this.state.email) && this.state.password != '' ) {
      //Submit to somewhere
      axios.post('/api/login', {email: this.state.email, password: this.state.password}).then((response)=> this.redirPage(response));
    }
    else if (!validateEmail(this.state.email)) {
      alert('Invalid email address');
    }
    else {
      alert('Password cannot be empty');
    }
  }


    /**
     * The redirPage method handles the processed sign in form by authenticating a successful sign-in or re-directing
     * you to sign in again.
     * @param {Object} response=response - the response is parased to verify successful and failing sign-ups
     */
    redirPage(response) {
        if(JSON.parse(response.data).islogined){
            this.state.redirect = true;
            this.setState(this.state);
        }else{
            alert('Incorrect email or password!');
        }
    }

    /**
     * The onclose method is meant to redirect the page after a successful login.
     * @param {Object} event=react_event - modifies the state of the react element
     */
    onclose(event) {
        this.state.redirect = true;
        this.setState({redirect: true});
    }

    /**
     * The render method invokes the formatted login page for the user to interact with once they're trying to
     * access their account once again.
     * @returns {*} - invokes the formatted login page.
     */
    render() {
    const Mobile = props => <Responsive {...props} maxWidth={767}/>;
    const Default = props => <Responsive {...props} minWidth={768}/>;

        if(this.state.redirect){
            return <App />;
        }

        return (
            <div className="App">
                <div>
                <header className="App-login-header">
                    <h3 className="App-title">Peterbook</h3>
                </header>
                </div>
        <Grid style={{marginTop: '-80px'}} columns={16} divided='vertically' className="text_board">
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
                            fluid icon='user' iconPosition='left' placeholder='email'
                            onChange={(e, {value})=> this.setState({email: value})}
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
                <SignUp onclose={()=> this.onclose()} open={this.state.open === 1} onClose={()=> this.setState({open: 0})}/>
            </div>
        );
    }
}

export default Login;