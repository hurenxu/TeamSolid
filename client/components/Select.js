import React, {Component} from 'react';
import {Button, Grid, Menu, Segment, Input} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import ReactDOM from "react-dom";

class Select extends Component {

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render(){
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing secondary vertical size='huge'>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />
          <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick} />
        </Menu>
      </div>
    );
  }
}

export default Select;