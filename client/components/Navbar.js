import React, {Component} from 'react';
import {Button, Grid, Menu, Segment, Input} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import ReactDOM from "react-dom";

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
      };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }){
    this.setState({ activeItem: name })

      if(name === 'posts'){
        this.props.handlePosts();
      }
      else if(name === 'messages'){
        this.props.handleMessages();
      }
      else{
        this.props.handleFriends();
      }
  }

  render() {
    return (
      <div>
        <Menu pointing size='huge'>
          <Menu.Item style={avatarStyle} name='me' onClick={this.handleItemClick}>
            <img className="ui avatar image" src="../assets/avatar.jpg"/>
            <span style={{marginLeft: '1em'}}>Profile</span>
          </Menu.Item>
          <Menu.Item name='posts' active={this.state.activeItem === 'posts'} onClick={this.handleItemClick}/>
          <Menu.Item name='messages' active={this.state.activeItem === 'messages'} onClick={this.handleItemClick} />
          <Menu.Item name='friends' active={this.state.activeItem === 'friends'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item name='logout' onClick={this.handleItemClick} />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default Navbar;