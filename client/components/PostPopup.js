import React, { Component } from 'react'
import { Container, Form, Popup, Button, Header, Image, Modal,Icon } from 'semantic-ui-react'
import axios from "axios/index";
import moment from "moment";

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
        const date = moment().format();

        this.props.createPost({msg: this.state.message, date: date});
        //axios.post(`/api/postPost`, {msg: this.state.message, date: date});
        this.setState({dimmer: false, open: false, message: ''});
    };
    uploadImage= (event) => {
        console.log(123);
        console.log(event.target.files[0]);
    }
    render() {
        const { message } = this.state
        return (
            <div>
                <Modal size='tiny' className="scrolling" style={{height: '50%'}} dimmer="blurring" open={this.props.open} onClose={()=> {this.setState(initialState); this.props.onClose()}}>
                    <Modal.Header as='h2' style={{textAlign: 'center'}}>Post</Modal.Header>
                    <Container style={{width: '400px', marginTop: '2em', marginBottom: '2em'}}>
                        <Form size='large'>
                            <Form.TextArea
                                placeholder='What do you want to post?' name='message' value={message}
                                onChange={(e, {value})=> this.setState({message: value})}
                            />
                            <Icon size='big' name='picture'/>
                            <Icon size='big' name='video camera'/>
                            <Form.Input type="file" style={{display: 'none'}}/>
                            <Form.Input type="file" style={{display: 'none'}} accept="image/*"/>
                            <Button.Group style={{float: 'right', marginRight: '10%'}}>
                                <Button onClick={()=> {this.close(); this.props.onClose()}}>Clear</Button>
                                <Button.Or />
                                <Button positive onClick={()=> { this.handleSubmit(); this.props.onClose()}}>Post</Button>
                            </Button.Group>
                        </Form>
                    </Container>

                </Modal>
            </div>
        )
    }
}

export default Signup