import React, { Component } from 'react'
import { Container, Form, Popup, Button, Header, Image, Modal,Icon } from 'semantic-ui-react'
import axios from "axios/index";
import moment from "moment";

/**
 * The public members incorporated to assist with signup functionality handling when a user uploads a picture or
 * video type file.
 * @type {{message: string, open: boolean, dimmer: string, aspect: string, imageFile: null, videoFile: null}}
 */
let initialState = {
    message: "",
    open: false,
    dimmer: 'blurring',
    aspect: "",
    imageFile: null,
    videoFile: null
};

/**
 * The PostPopup class is used to supplement functionality for handling when a user uploads a picture or
 * video type file.
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
         * The public members needed to update the state of the React component.
         * @type {{message: string, open: boolean, dimmer: string, aspect: string, imageFile: null, videoFile: null}}
         */
        this.state = initialState;

        /**
         * The handleSubmit fires when a user attemps to add picture/video file.
         * @type {Method}
         */
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Show will emulate the dimmer effect which hides distractions to focus attention on particular content.
     * @param dimmer
     * @type {functionality}
     */
    show = dimmer => () => {
        this.setState({ dimmer, open: true })
    }

    /**
     * Close will stop emulating the dimmer effect and stop hiding distractions.
     * @type {functionality}
     */
    close = () => {
        this.setState({ open, dimmer: false })
    }

    /**
     * The handleSubmit fires when a user attemps to add picture/video file.
     * It ensures you that it properly handles images, and video types for posting.
     * @param {Object} event=react_event - modifies the state of the react element
     * @type {Method}
     */
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
        console.log(data);
        //var message={msg: this.state.message, date: date};
        this.props.createPost(data);
        console.log(this.state.imageFile);
        console.log(this.state.imageFile.size);
        //axios.post(`/api/postPost`, {msg: this.state.message, date: date});
        this.setState({dimmer: false, open: false, message: ''});
    };

    /**
     * The saveImage method is meant to save the image submitted by the user.
     * @param {Object} event=react_event - modifies the state of the react element
     * @type {Method}
     */
    saveImage = (event) => {
        this.setState({imageFile: event.target.files[0]});
    }

    /**
     * The saveVideo method is meant to save the video submitted by the user.
     * @param {Object} event=react_event - modifies the state of the react element
     * @type {Method}
     */
    saveVideo = (event) => {
        this.setState({videoFile: event.target.files[0]});

    }

    /**
     * The render method invokes the user's formmated social media application so that the user can post
     * image and video types on their social media template.
     * @returns {*} - invokes the formatted user's social media template ready for personalized posting.
     */
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