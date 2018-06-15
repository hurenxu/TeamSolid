import React, {Component} from 'react';
import {Button, Grid, Header, Image, Form, Icon, Segment, Divider} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import axios from 'axios';
import ReactDOM from "react-dom";
import ChatCell from "./ChatCell"
import MediaQuery from 'react-responsive';
import '../css/ChatWindow.css'

const overallStyle = {
  padding: '2em'
}

const mobileOverallStyle = {
  padding: '1em'
}

const messageStyle = {
  height: '50vh',
  overflow: 'scroll',
  overflowY: 'scroll',
  overflowX: 'hidden'
}

const mobileMessageStyle = {
  height: '45vh',
  overflow: 'scroll',
  overflowY: 'scroll',
  overflowX: 'hidden'
}

const inputStyle = {}

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

    if(this.messagesEnd){
      this.messagesEnd.scrollIntoView({behavior: "smooth"});
    }

  }

  componentDidUpdate() {
    if(this.messageEnd){
      this.messagesEnd.scrollIntoView({behavior: "smooth"});
    }
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

    if (this.state.targetID == "") {
      return (
        <div></div>
      );
    }

    const chatcells = this.state.chatHistory.map((message) =>
        <ChatCell me={message.sid != this.state.targetID} msg={message.msg} date={message.date}
                  img={'../assets/avatar3.jpg'}/>);

    return (
      <div>
        <MediaQuery query="(max-device-width: 1224px)">
          <Segment>
            <Grid style={mobileOverallStyle}>
              <Grid.Row className="nopadding">
                <Grid.Column width={2}>
                  <Icon name='angle left' onClick={()=>this.props.handleMobileChatClose()}/>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Image circular src='../assets/avatar.jpg' size='mini'/>
                </Grid.Column>
                <Grid.Column width={2} textAlign='left' verticalAlign='middle'>
                  <Header>{this.state.targetUserName}</Header>
                </Grid.Column>
                <Grid.Column width={9}></Grid.Column>
              </Grid.Row>
              <Divider section/>
              <Grid.Row style={mobileMessageStyle}>
                <Grid.Column>
                  {chatcells}
                  <div style={{ float:"left", clear: "both" }}
                       ref={(el) => { this.messagesEnd = el; }}>
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Divider section/>
              <Grid.Row style={textareaStyle}>
                <Grid.Column width={16}>
                  <Form reply style={inputStyle}>
                    <Grid>
                      <Grid.Column widht={2}></Grid.Column>
                      <Grid.Column width={10}><Form.TextArea name='message' value={message}
                                                             onChange={(e, {value}) => this.setState({message: value})}/></Grid.Column>
                      <Grid.Column width={2}><Button style={{marginTop: '1em'}} content='Send'
                                                     labelPosition='left' icon='send' size='tiny'
                                                     primary
                                                     onClick={this.handleSubmit}/></Grid.Column>
                      <Grid.Column widht={2}></Grid.Column>

                    </Grid>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </MediaQuery>
        <MediaQuery query="(min-device-width: 1224px)">
          <Segment>
          <Grid style={overallStyle}>
            <Grid.Row className="nopadding">
              <Grid.Column floated='left' width={5}>
                <Header size='medium'>
                  <Image circular src='../assets/avatar.jpg'/>
                  {' '}{this.state.targetUserName}
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Divider section/>
            <Grid.Row style={messageStyle}>
              <Grid.Column>
                {chatcells}
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}>
                </div>
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
          </Segment>
        </MediaQuery>
      </div>
    );
  }
}

export default ChatWindow;