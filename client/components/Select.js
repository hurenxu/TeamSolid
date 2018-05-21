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
        <Menu style={{marginTop: '5vh'}} pointing secondary vertical size='huge'>
          <Menu.Item name='family' active={activeItem === 'family'} onClick={this.handleItemClick} />
          <Menu.Item name='acquaintance' active={activeItem === 'acquaintance'} onClick={this.handleItemClick} />
          <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick} />
          <Menu.Item name='work' active={activeItem === 'work'} onClick={this.handleItemClick} />
        </Menu>
      </div>
    );
  }
}

export default Select;