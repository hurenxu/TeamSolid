import React, { Component } from 'react'
import { Container, Form, Popup, Button, Header, Image, Modal,Icon } from 'semantic-ui-react'
import axios from "axios/index";
import moment from "moment";

let initialState = {
    message: "",
    open: false,
    dimmer: 'blurring',
    aspect: "",
    imageFile: null,
    videoFile: null
};

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    show = dimmer => () => {
        this.setState({ dimmer, open: true })
    }

    close = () => {
        this.setState({ open, dimmer: false })
    }

    handleSubmit = (event) => {
        if(this.state.message === "") {
            return
        }
        const date = moment().format();
        const data = new FormData();
        data.append('image', this.state.imageFile);
        data.append('video', this.state.videoFile);
        data.append('msg', this.state.message);
        data.append('date', date);
        //var message={msg: this.state.message, date: date};
        this.props.createPost(data);
        //axios.post(`/api/postPost`, {msg: this.state.message, date: date});
        this.setState({dimmer: false, open: false, message: ''});
    };
    saveImage = (event) => {
        this.setState({imageFile: event.target.files[0]});
    }
    saveVideo = (event) => {
        this.setState({videoFile: event.target.files[0]});

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
                            <label for="image">
                                <Icon size='big' name='picture'/>
                                <Form.Input type="file" id="image" onChange={this.saveImage} style={{display: 'none'}} accept="image/*"/>
                            </label>
                            <label htmlFor="video">
                                <Icon size='big' name='video camera'/>
                                <Form.Input type="file" id="video" onChange={this.saveVideo} style={{display: 'none'}} accept="video/*"/>
                            </label>
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