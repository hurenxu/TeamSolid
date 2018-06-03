import React, {Component} from 'react';
import {Button, Grid, Menu, Segment, Input, Label} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import ReactDOM from "react-dom";
import '../css/App.css';
import axios from "axios/index";
import TechnicalSupport from "./TechnicalSupport"

const avatarStyle = {
  width: '21.3vw',
  paddingLeft: '6em',
  paddingRight: '6em',
}

class Navbar extends Component {
  constructor(props) {
    super(props);
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

  loadUsername() {
    axios.post('/api/getUserName').then((response) => {
      this.setState({
        username: JSON.parse(response.data).username
      });
    });
  }

  render() {
    this.state.subMsg = (this.props.sub === true) ? "Subscribed" : "Not Subscribed";

    return (
      <div>
        <Menu pointing size='huge'>
          <Menu.Item name='me' onClick={this.handleItemClick}>
              <Label as='a' color='blue' image onClick={this.props.handleUnsub}>
                  <img src="../assets/avatar.jpg" />
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