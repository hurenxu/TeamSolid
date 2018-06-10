import React, { Component } from 'react'
import { Container, Form, Popup, Button, Header, Image, Modal } from 'semantic-ui-react'
import axios from "axios/index";
import App from './App';

/**
 * The public members incorporated to complete the social network sign up functionality.
 * @type {{username: string, password: string, repeat: string, email: string, message: Array, open: boolean, dimmer: string}}
 */
let initialState = {
    username: "",
    password: "",
    repeat: "",
    email: "",
    message: [],
    open: false,
    dimmer: 'blurring'
};

/**
 * The Signup class is used to accomplish the sign up functionality for the social network web application.
 * @extends {Component}
 */
class Signup extends Component {

    /**
     * The constructor passes a props object which is a react component that can be modified for use.
     * @param {Object} props=react_component - a react component that can be modified
     */
    constructor(props) {
        super(props);

        /**
         * The public members used to handle the sign up for the first time.
         * @type {{username: string, password: string, repeat: string, email: string, message: Array, open: boolean, dimmer: string}}
         */
        this.state = initialState;

        /**
         * The handleSubmit fires when the sign up form is submitted. It ensures you use a proper username and
         * ensures password configuration.
         * @type {method}
         */
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirPage = this.redirPage.bind(this);
    }

    /**
     * Show will emulate the dimmer effect which hides distractions to focus attention on particular content.
     * @param dimmer
     * @type {functionality}
     */
    show = dimmer => () => this.setState({ dimmer, open: true })

    /**
     * Close will stop emulating the dimmer effect and stop hiding distractions.
     * @type {functionality}
     */
    close = () => this.setState({ open, dimmer: false })

    /**
     * The handleSubmit fires when the sign up form is submitted. It ensures you use a proper username and
     * ensures password configuration.
     * @param {Object} event=react_event - modifies the state of the react element
     */
    handleSubmit = (event) => {
        let message = [];
        if(this.state.username === "") {
            alert("Username can't be empty!");
            this.setState({message: message});
            return
        }
        if(this.state.password === "") {
            alert("Password can't be empty!");
            this.setState({message: message});
            return
        }
        if(this.state.repeat === "") {
            alert("Please enter your password again!");
            this.setState({message: message});
            return
        }
        if(this.state.password !== this.state.repeat) {
            alert("Password is not matching!");
            this.setState({message: message});
            return
        }
        axios.post(`/api/signup`, {username: this.state.username, password: this.state.password, email: this.state.email}).then((response)=> this.redirPage(response));
        this.setState({open: false});
        this.setState({dimmer: false});
    };

    /**
     * The redirPage method handles the processed sign up form by authenticating a successful sign-up or re-directing
     * you to sign up again.
     * @param {Object} response=response - the response is parased to verify successful and failing sign-ups
     */
    redirPage(response) {
            if(JSON.parse(response.data).result==="OK"){
                this.props.onclose();
            }else{
                alert("Signup fail!");
            }
    }

    /**
     * The render method invokes the formatted sign up page where the user can interact with the page to
     * accomplish the sign up procedure.
     * @returns {*} - invokes the formatted sign up page
     */
    render() {
        const { dimmer } = this.state

            return (
                <div>
                    <Modal size='tiny' className="scrolling" style={{height: '60%'}} dimmer={dimmer}
                           open={this.props.open} onClose={()=> {this.setState(initialState); this.props.onClose()}}>
                        <Modal.Header as='h2' style={{textAlign: 'center'}}>Sign Up</Modal.Header>
                        <Container style={{width: '400px', marginTop: '2em', marginBottom: 'auto'}}>
                            <Form size='large'>
                                <Form.Input
                                    fluid icon='user' iconPosition='left' placeholder='Username'
                                    onChange={(e, {value})=> this.setState({username: value})}
                                />
                                <Form.Input
                                    fluid icon='lock' iconPosition='left' placeholder='Password' type='password'
                                    onChange={(e, {value})=> this.setState({password: value})}
                                />
                                <Form.Input
                                    fluid icon='ellipsis horizontal' iconPosition='left' placeholder='Repeat Password' type='password'
                                    onChange={(e, {value})=> this.setState({repeat: value})}
                                />
                                <Form.Input
                                    fluid icon='envelope' iconPosition='left' placeholder='Email'
                                    onChange={(e, {value})=> this.setState({email: value})}
                                />
                            </Form>
                        </Container>
                        <Modal.Actions>
                            <Button color='black' icon='undo' content="Close" labelPosition='right' onClick={()=> {this.close(); this.props.onClose()}} />
                            <Button positive icon='checkmark' labelPosition='right' content="Sign Up" onClick={()=> {this.handleSubmit(); this.props.onClose(); }} />
                        </Modal.Actions>
                    </Modal>
                </div>
            )
    }
}

export default Signup