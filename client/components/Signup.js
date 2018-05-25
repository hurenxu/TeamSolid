import React, { Component } from 'react'
import { Container, Form, Popup, Button, Header, Image, Modal } from 'semantic-ui-react'

class Signup extends Component {
    state = {
        username: "",
        password: "",
        repeat: "",
        message: [],
        open: false
    }

    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

    handleSubmit = (event) => {
        let message = [];
        if(this.state.username === "") {
            message.push("Username can't be empty!");
            this.setState({message: message});
            return
        }
        if(this.state.password === "") {
            message.push("Password can't be empty!");
            this.setState({message: message});
            return
        }
        if(this.state.repeat === "") {
            message.push("Please enter your password again!");
            this.setState({message: message});
            return
        }
        if(this.state.password !== this.state.repeat) {
            message.push("Password is not matching!");
            this.setState({message: message});
            return
        }
        this.setState({open: false});
    };

    render() {
        const { open, dimmer } = this.state

        return (
            <div>
                <Button onClick={this.show('blurring')}>Sign Up</Button>

                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header as='h2' style={{textAlign: 'center'}}>Sign Up</Modal.Header>
                    <Container style={{width: '400px', marginTop: '2em', marginBottom: '2em'}}>
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
                        </Form>
                    </Container>
                    <Modal.Actions>
                        <Button color='black' icon='undo' content="Close" labelPosition='right' onClick={this.close} />
                        <Button positive icon='checkmark' labelPosition='right' content="Sign Up" onClick={this.handleSubmit} />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default Signup