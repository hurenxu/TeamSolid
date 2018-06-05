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

const inputStyle = {}

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
      targetID: props.targetID,
      targetUseName: "",
      chatHistory: []
    }

    this.loadMessage(props.targetID)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadMessage = this.loadMessage.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.loadMessage(this.state.targetID),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      targetID: nextProps.targetID
    })

    this.loadMessage(nextProps.targetID)
  }

  handleSubmit = (event) => {
    this.postMessage()
  }

  loadMessage(targetID) {
    // get user name
    if (targetID != "") {
      axios.post('/api/searchUser', {searchKey: targetID}).then((response) => {
        this.setState({
          targetUserName: JSON.parse(response.data).username
        });
      });
    }

    axios.post('/api/switchChatTarget', {tid: targetID}).then((response) => {
      var messages = JSON.parse(response.data)
      messages.sort(function(a,b) {
        return new Date(a.date) - new Date(b.date)
      })

      this.setState({
        chatHistory: messages
      });
    });
  }

  postMessage() {
    if (this.state.message === "") { return }

    var currentDate = new Date()

    axios.post('/api/postMessage', {msg: this.state.message, to: this.state.targetID, date: currentDate}).then((response) => {
      this.loadMessage(this.state.targetID)
    })

    this.setState({message: ''})
  }

  render() {
    const {message} = this.state;

    const chatcells = this.state.chatHistory.map((message) =>
      <ChatCell me={message.sid != this.state.targetID} msg={message.msg} date={message.date} img={'../assets/avatar3.jpg'}/>);

    return (
      <div>
        <Grid style={overallStyle}>
          <Grid.Row style={headerStyle}>
            <Grid.Column floated='left' width={5}>
              <Header size='medium'>
                <Image circular src='../assets/avatar.jpg'/>
                {' '}{this.state.targetUserName}
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={messageStyle}>
            <Grid.Column>
              {chatcells}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={textareaStyle}>
            <Grid.Column width={16}>
              <Form reply style={inputStyle}>
                <Grid>
                  <Grid.Column width={12}><Form.TextArea name='message' value={message}
                                                         onChange={(e, {value}) => this.setState({message: value})}/></Grid.Column>
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