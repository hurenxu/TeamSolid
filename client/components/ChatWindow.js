import React, {Component} from 'react';
import {Button, Grid, Header, Image, Form, Icon} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import axios from 'axios';
import ReactDOM from "react-dom";
import ChatCell from "./ChatCell"

const overallStyle = {
    padding: '2em',
}

const messageStyle = {
    height: '450px',
    overflow: 'scroll',
    overflowY: 'scroll',
    overflowX: 'hidden'
}

const inputStyle = {
}

const headerStyle = {
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px'
}

const textareaStyle = {
    marginTop: '1em',
}

class ChatWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            // TODO: set id with the user
            id: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        if(this.state.message === "") {
            return
        }
        axios.post(`/sendChatMessage`, {chatMessage: this.state.message, id: this.state.id})
        this.setState({ message: ''})
    };

    render() {
        const { message } = this.state

        return (
            <div>
                <Grid style={overallStyle}>
                    <Grid.Row style={headerStyle}>
                        <Grid.Column floated='left' width={5}>
                        <Header size='medium'>
                            <Image circular src='../assets/avatar.jpg' />
                            {' '}Patrick
                        </Header>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={messageStyle}>
                        <Grid.Column>
                            <ChatCell me={false} img={'../assets/avatar3.jpg'}/>
                            <ChatCell me={true} img={'../assets/avatar.jpg'}/>
                            <ChatCell me={false} img={'../assets/avatar3.jpg'}/>
                            <ChatCell me={false} img={'../assets/avatar3.jpg'}/>
                            <ChatCell me={true} img={'../assets/avatar.jpg'}/>
                            <ChatCell me={false} img={'../assets/avatar.jpg'}/>
                            <ChatCell me={true} img={'../assets/avatar.jpg'}/>
                            <ChatCell me={true} img={'../assets/avatar.jpg'}/>
                            <ChatCell me={true} img={'../assets/avatar.jpg'}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={textareaStyle}>
                        <Grid.Column width={16}>
                            <Form reply style={inputStyle}>
                                <Grid>
                                    <Grid.Column width={12}><Form.TextArea name='message' value={message}
                                        onChange={(e, {value})=> this.setState({message: value})}/></Grid.Column>
                                    <Grid.Column width={4}><Button style={{marginTop: '1em'}} content='Send'
                                                                   labelPosition='left' icon='send' size='big'
                                                                   primary
                                                                   onClick={this.handleSubmit}/></Grid.Column>
                                </Grid>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default ChatWindow;