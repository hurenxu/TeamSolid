import React, { Component } from 'react'
import { Container, Form, Popup, Button, Header, Image, Modal } from 'semantic-ui-react'
import axios from "axios/index";

let initialState = {
    message: "",
    open: false,
    dimmer: 'blurring',
    aspect: ""
};

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open, dimmer: false })

    handleSubmit = (event) => {
        if(this.state.message === "") {
            return
        }

        axios.post(`/api/postMessage`, {postMessage: this.state.message, aspect: this.state.aspect});
        this.setState({dimmer: false, open: false, message: ''});
    };

    render() {
        const { message } = this.state
        return (
            <div>
                <Modal size='tiny' className="scrolling" style={{height: '40%'}} dimmer="blurring" open={this.props.open} onClose={()=> {this.setState(initialState); this.props.onClose()}}>
                    <Modal.Header as='h2' style={{textAlign: 'center'}}>Post</Modal.Header>
                    <Container style={{width: '400px', marginTop: '2em', marginBottom: '2em'}}>
                        <Form size='large'>
                            <Form.TextArea
                                placeholder='What do you want to post?' name='message' value={message}
                                onChange={(e, {value})=> this.setState({message: value})}
                            />
                            <Button.Group style={{float: 'right', marginRight: '10%'}}>
                                <Button onClick={()=> {this.close(); this.props.onClose()}}>Clear</Button>
                                <Button.Or />
                                <Button positive onClick={()=> {this.handleSubmit(); this.props.onClose()}}>Post</Button>
                            </Button.Group>
                        </Form>
                    </Container>

                </Modal>
            </div>
        )
    }
}

export default Signup