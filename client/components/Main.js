import React, {Component} from 'react';
import {Button, Grid, Menu, Feed} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import ReactDOM from "react-dom";
import Navbar from './Navbar'
import Select from './Select'
import MainFeed from './MainFeed'
import ChatWindow from './ChatWindow'
import FeedInfo from './FeedInfo'
import Aspect from './Aspect'
import FriendManagement from './FriendManagement'

class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      mode: 'posts',
      targetUserID: "",
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

  handleMessages(inputID=""){
    this.setState({
      mode: 'messages',
      targetUserID: inputID
    })
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
      (this.state.mode === 'messages' ?
        <ChatWindow targetID={this.state.targetUserID} handleMessages={this.handleMessages}/> : <FriendManagement/>)

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