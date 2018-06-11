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

/**
 * The Main class is the main driver for the PeterBook Application.
 * @extends {Component}
 */
class Main extends Component {


    /**
     * The constructor passes a props object which is a react component that can be modified for use.
     * @param {Object} props=react_component - a react component that can be modified
     */
  constructor(props) {
    super(props);

        /**
         * The public members needed to update the state of the React component.
         * @type {{mode: string, targetUserID: string, aspect: string, friendList: Array, sub: boolean, loginBack: boolean}}
         */
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

    /**
     * The handlePosts method is meant to configure the posts for a user
     * @type {Method}
     */
  handlePosts() {
    this.setState({
      mode: 'posts'
    })
  }

    /**
     * The handleFriends method is meant to configure the friends for a user
     * @type {Method}
     */
  handleFriends() {
    this.setState({
      mode: 'friends'
    })
  }

    /**
     * The handleMessages method is meant to configue the messages for a user
     * @param {string} inputID=id_string - the passed in string
     * @type {Method}
     */
  handleMessages(inputID = "") {
    this.setState({
      mode: 'messages',
      targetUserID: inputID
    })
  }

    /**
     * The handlePost method is meant to configure the posts for a user
     * @param {Object} aspect=aspect - aspect modified the state of the React element
     * @type {Method}
     */
  handlePost(aspect) {
    this.setState({
      aspect: aspect
    });
    this.state.aspect = aspect;
  }


    /**
     * The handleClick method is meant to fire when the user attempts to click an element.
     * @type {Method}
     */
    handleClick() {
        axios.post('/api/setsub', {sub: true});
        this.setState({
            sub: true,
            loginBack: true
        });
        this.state.sub = true;
        this.state.loginBack = true;
    }

    /**
     * The handleUnsub method is meant to configure when a user attempts to unsubscribe
     */
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

    /**
     * The render method invokes the formatted web page that utilizes all the methods listed in this class
     * to provide an interactive page for the user.
     * @returns {*} - invokes the formatted web page
     */
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
          <Grid.Column width={4}>
            {aspect}
          </Grid.Column>
          <Grid.Column width={8}>
            {window}
          </Grid.Column>
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