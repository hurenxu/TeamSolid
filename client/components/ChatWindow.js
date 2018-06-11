import React, {Component} from 'react';
import {Button, Grid, Header, Image, Form, Icon} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import axios from 'axios';
import ReactDOM from "react-dom";
import ChatCell from "./ChatCell"

/**
 * The overallStyle uses CSS attributes for formatting purposes.
 * @type {{padding: string}}
 */
const overallStyle = {
  padding: '2em',
}

/**
 * The messageStyle uses CSS attributes for formatting purposes.
 * @type {{height: string, overflow: string, overflowY: string, overflowX: string}}
 */
const messageStyle = {
  height: '450px',
  overflow: 'scroll',
  overflowY: 'scroll',
  overflowX: 'hidden'
}

/**
 * The inputStyle uses CSS attributes for formatting purposes.
 * @type {{}}
 */
const inputStyle = {}

/**
 * The headerStyle uses CSS attributes for formatting purposes.
 * @type {{borderBottomStyle: string, borderBottomWidth: string}}
 */
const headerStyle = {
  borderBottomStyle: 'solid',
  borderBottomWidth: '1px'
}

/**
 * The textareaStyle uses CSS attributes for formatting purposes.
 * @type {{marginTop: string}}
 */
const textareaStyle = {
  marginTop: '1em',
}

/**
 * The ChatWindow class is meant to accomplish functionality that will allow the user to interact with a chat window.
 * @extends {Component}
 */
class ChatWindow extends Component {

    /**
     * The constructor passes a props object which is a react component that can be modified for use.
     * @param {Object} props=react_component - a react component that can be modified
     */
  constructor(props) {
    super(props);

        /**
         * State is susceptible to change and variability for react components.
         * @type {{message: string, targetID: *, targetUseName: string, chatHistory: Array}}
         */
    this.state = {
      message: "",
      // TODO: set id with the user
      targetID: props.targetID,
      targetUseName: "",
      chatHistory: []
    }

    this.loadMessage(props.targetID)

        /**
         * The handleSubmit method is meant to fire when the user submits a component.
         * @type {Method}
         */
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadMessage = this.loadMessage.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

    /**
     * The componentDidMount method is meant to configure that it loads the correct message.
     * @type {Method}
     */
  componentDidMount() {
        /**
         * The timerID is meant to be used to set the interval for loading the messages.
         * @type {Method}
         */
    this.timerID = setInterval(
      () => this.loadMessage(this.state.targetID),
      1000
    );
  }

    /**
     * The componentWillUnmount method is meant to configure restarting the timerID.
     * @type {Method}
     */
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

    /**
     * The coponentWillReceiveProps method is meant to configure that the react component will receive the next
     * react component.
     * @param nextProps
     */
  componentWillReceiveProps(nextProps) {
    this.setState({
      targetID: nextProps.targetID
    })

    this.loadMessage(nextProps.targetID)
  }

    /**
     * The handleSubmit method is meant to fire when the user submits a component.
     * @param {Object} event=react_event - modifies the state of the react element.
     */
  handleSubmit = (event) => {
    this.postMessage()
  }

    /**
     * The loadMessage method is meant to load the message that the user has sent
     * @param {string} targetID=message_string - the user message
     */
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

    /**
     * The postMessage method is meant handle posting the message that the user is receiving/sending.
     * @type {Method}
     */
  postMessage() {
    if (this.state.message === "") { return }

    var currentDate = new Date()

    axios.post('/api/postMessage', {msg: this.state.message, to: this.state.targetID, date: currentDate}).then((response) => {
      this.loadMessage(this.state.targetID)
    })

    this.setState({message: ''})
  }

    /**
     * The render method invokes the formatted ChatWindow for the user to interact with.
     * @returns {*} - formatted chat window
     */
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