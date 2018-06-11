import React, {Component} from 'react';
import {Button, Grid, Menu, Segment, Input, Label} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import ReactDOM from "react-dom";
import '../css/App.css';
import axios from "axios/index";
import TechnicalSupport from "./TechnicalSupport"

/**
 * The avatarStyle uses CSS attributes for formatting the position of the avatar.
 * @type {{width: string, paddingLeft: string, paddingRight: string}}
 */
const avatarStyle = {
  width: '21.3vw',
  paddingLeft: '6em',
  paddingRight: '6em',
}

/**
 * The Navbar is meant to accomplish functionality that will allow the user to use a navigation bar for their
 * social media web application.
 * @extends {Component}
 */
class Navbar extends Component {

    /**
     * The constructor passes a props object which is a react component that can be modified for use.
     * @param {Object} props=react_component - a react component that can be modified
     */
  constructor(props) {
    super(props);

        /**
         * State is susceptible to change and variability for react components.
         * @type {{activeItem: string, username: string, openSupport: number, subMsg: string}}
         */
    this.state =
      {
        activeItem: 'posts',
          username: 'Profile',
          openSupport: 0,
          subMsg: "Not Subscribed"
      };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.loadUsername = this.loadUsername.bind(this);

    this.loadUsername()
  }

    /**
     * The handleItemClick method is meant to fire when a component is clicked on.
     * @param {Object} e=react_event - modifies the state of the react element
     * @param {string} name=name_string - the name string
     */
  handleItemClick(e, {name}) {
    this.setState({activeItem: name})

    if (name === 'posts') {
      this.props.handlePosts();
    }
    else if (name === 'messages') {
      this.props.handleMessages();
    }
    else if (name === 'friends'){
      this.props.handleFriends();
    }
    else if (name === 'support'){
      this.setState({openSupport:1});
    }
  }

    /**
     * The loadUsername method is meant to configure the users name and load it.
     * @type {Method}
     */
  loadUsername() {
    axios.post('/api/getUserName').then((response) => {
      this.setState({
        username: JSON.parse(response.data).username
      });

      console.log("loading user name");
      console.log(JSON.parse(response.data).username)
    });
  }

    /**
     * The render method invokes the formatted navigation bar for the user to interact with.
     * @returns {*} - invokes the formatted navigation bar
     */
  render() {
    this.state.subMsg = (this.props.sub === true) ? "Subscribed" : "Not Subscribed";

    return (
      <div>
        <Menu pointing size='huge'>
          <Menu.Item name='me' onClick={this.handleItemClick}>
              <img src="../assets/avatar.jpg" />
            <Label as='a' color='blue' onClick={this.props.handleUnsub}>
                  {this.state.username}
                  <Label.Detail>{this.state.subMsg}</Label.Detail>
              </Label>
          </Menu.Item>
          <Menu.Item name='posts' active={this.state.activeItem === 'posts'} onClick={this.handleItemClick}/>
          <Menu.Item name='messages' active={this.state.activeItem === 'messages'} onClick={this.handleItemClick}/>
          <Menu.Item name='friends' active={this.state.activeItem === 'friends'} onClick={this.handleItemClick}/>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...'/>
            </Menu.Item>
              <Menu.Item name='support' active={this.state.activeItem === 'support'} onClick={this.handleItemClick}/>
            <Menu.Item name='logout' onClick={this.handleItemClick}/>
          </Menu.Menu>
        </Menu>
        <TechnicalSupport open={this.state.openSupport === 1} onClose={()=> this.setState({openSupport: 0})}/>
      </div>
    );
  }
}

export default Navbar;