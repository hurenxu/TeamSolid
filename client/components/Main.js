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
import axios from "axios/index";

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: 'posts',
      targetUserID: "",
      aspect: 'Others',
      friendList: [],
        sub: false,
        loginBack: true
    }

    this.handlePosts = this.handlePosts.bind(this);
    this.handleFriends = this.handleFriends.bind(this);
    this.handleMessages = this.handleMessages.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleUnsub = this.handleUnsub.bind(this);
  }

  handlePosts() {
    this.setState({
      mode: 'posts'
    })
  }

  handleFriends() {
    this.setState({
      mode: 'friends'
    })
  }

  handleMessages(inputID = "") {
    this.setState({
      mode: 'messages',
      targetUserID: inputID
    })
  }

  handlePost(aspect) {
    this.setState({
      aspect: aspect
    });
    this.state.aspect = aspect;
  }


    handleClick() {
        axios.post('/api/setsub', {sub: true});
        this.setState({
            sub: true,
            loginBack: true
        });
        this.state.sub = true;
        this.state.loginBack = true;
    }

    handleUnsub() {
        var boolean = !this.state.sub;
        axios.post('/api/setsub', {sub: boolean});
        this.setState({
            sub: boolean,
            loginBack: true
        });
        this.state.sub = boolean;
        this.state.loginBack = true;
    }

  render() {

    const window = (this.state.mode === 'posts') ? <MainFeed/> :
      (this.state.mode === 'messages' ?
        <ChatWindow targetID={this.state.targetUserID} handleMessages={this.handleMessages}/> : <FriendManagement/>)

    const aspect = (this.state.mode === 'posts') ? <Aspect handleAspect={this.handlePost}/> :
      (this.state.mode === 'messages' ? <Select handleMessages={this.handleMessages}></Select> : <div></div>)

    if(this.state.loginBack === true) {
        axios.post('/api/getsub').then((response) => {
            this.setState({
                sub: JSON.parse(response.data).sub
            });
            this.state.sub = JSON.parse(response.data).sub;
        });
        this.state.loginBack = false;
    }

    return (
      <div>
        <Navbar handlePosts={this.handlePosts} handleFriends={this.handleFriends}
                handleMessages={this.handleMessages} sub={this.state.sub} handleUnsub={this.handleUnsub}></Navbar>
        <Grid>
          {this.state.mode === 'friends' &&
            <Grid.Column width={1}>
            </Grid.Column>
          }
          {this.state.mode != 'friends' &&
            <Grid.Column width={4}>
              {aspect}
            </Grid.Column>
          }
          <Grid.Column width={this.state.mode === 'friends' ? 9 : 8}>
            {window}
          </Grid.Column>
          {this.state.mode === 'friends' &&
            <Grid.Column width={1}>
            </Grid.Column>
          }
          <Grid.Column width={4}>
              {console.log(this.state.sub)}
            <FeedInfo sub={this.state.sub} handleClick={this.handleClick}/>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Main;