import React, {Component} from 'react';
import {Button, Grid, Menu, Feed} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import ReactDOM from "react-dom";
import Navbar from './Navbar'
import Select from './Select'
import MainFeed from './MainFeed'
import ChatWindow from './ChatWindow'
import FeedInfo from './FeedInfo'
import axios from 'axios'
import Aspect from './Aspect'
import FriendManagement from './FriendManagement'

const message0 = {
  messages: [
    { me: false, text: "Hello" },
    { me: true, text: "Hi" },
    { me: false, text: "Where are you from?" },
    { me: false, text: "San Diego" }
  ]
}

const message1 = {
  messages: [
    { me: false, text: "I love u" },
    { me: true, text: "What???!" },
    { me: false, text: "I said I love u." },
    { me: false, text: "Okay!" }
  ]
}

const message2 = {
  messages: [
    { me: false, text: "Dude help!" },
    { me: true, text: "What is wrong!" },
    { me: false, text: "Nothing" },
    { me: false, text: "Okay!" }
  ]
}

const hardcoded = [message0, message1, message2]

class Main extends Component {


  constructor(props){
    super(props);
    this.state = {
      mode: 'posts',
      targetUserID: 1,
      message: hardcoded[1],
      aspect: 'Others'
    }

    this.handlePosts = this.handlePosts.bind(this);
    this.handleFriends = this.handleFriends.bind(this);
    this.handleMessages = this.handleMessages.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handlePosts(){
    this.setState({
      mode: 'posts'
    })
  }

  handleFriends(){
    this.setState({
      mode: 'friends'
    })
  }

  handleMessages(inputID=1){
    this.setState({
      mode: 'messages',
      targetUserID: {inputID},
      message: hardcoded[inputID]
    })

    // post for target user change
    axios.post('/api/switchChatTarget', {tid: inputID}).then((response) => {
      
    });

  }

    handlePost(aspect){
        this.setState({
            aspect: aspect
        });
        this.state.aspect = aspect;
        // post for target user change
        // axios.post('/api/switchChatTarget', {tid: inputID}).then((response) => {});
    }

  render() {

    const window = (this.state.mode === 'posts') ? <MainFeed/> :
      (this.state.mode === 'messages' ? <ChatWindow messageJson={this.state.message}/> : <div></div>)

    const aspect = (this.state.mode === 'posts') ? <Aspect handleAspect={this.handlePost}/> :
      (this.state.mode === 'messages' ? <Select handleMessages={this.handleMessages}></Select> : <div></div>)

    return (
      <div>
        <Navbar handlePosts={this.handlePosts} handleFriends={this.handleFriends} handleMessages={this.handleMessages}></Navbar>
        <Grid>
            <Grid.Column width={4}>
                {aspect}
            </Grid.Column>
            <Grid.Column width={8}>
              {window}
            </Grid.Column>
            <Grid.Column width={4}>
                <FeedInfo />
            </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Main;