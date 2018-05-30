import React, {Component} from 'react';
import {Button, Grid, Menu, Feed} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import axios from 'axios';
import ReactDOM from "react-dom";
import Navbar from './Navbar'
import Select from './Select'
import MainFeed from './MainFeed'
import ChatWindow from './ChatWindow'
import FeedInfo from './FeedInfo'

class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      mode: 'posts',
      targetUserID: "",
    }

    this.handlePosts = this.handlePosts.bind(this);
    this.handleFriends = this.handleFriends.bind(this);
    this.handleMessages = this.handleMessages.bind(this);
  }

  handlePosts(){
    console.log("Posts!!")
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

  render() {

    const window = (this.state.mode === 'posts') ? <MainFeed/> :
      (this.state.mode === 'messages' ?
        <ChatWindow targetID={this.state.targetUserID} handleMessages={this.handleMessages}/> : <div></div>)

    return (
      <div>
        <Navbar handlePosts={this.handlePosts} handleFriends={this.handleFriends} handleMessages={this.handleMessages}></Navbar>
        <Grid>
            <Grid.Column width={4}>
              <Select handleMessages={this.handleMessages}></Select>
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