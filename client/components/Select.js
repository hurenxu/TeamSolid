import React, {Component} from 'react';
import {Button, Grid, Menu, Segment, Input, Label} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import ReactDOM from "react-dom";

class Select extends Component {

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render(){
    const { activeItem } = this.state;

    return (
      <div>
          <Menu vertical style={{marginTop: '5vh'}} pointing secondary vertical size='huge'>
              <Menu.Item>
                  <Input icon='search' placeholder='Search tag...' />
              </Menu.Item>
              <Menu.Item name='family' active={activeItem === 'family'} onClick={this.handleItemClick}>
                  <Label color='green'>1</Label>
                  family
              </Menu.Item>

              <Menu.Item name='acquaintance' active={activeItem === 'acquaintance'} onClick={this.handleItemClick}>
                  <Label>51</Label>
                  acquaintance
              </Menu.Item>

              <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick}>
                  <Label>1</Label>
                  friends
              </Menu.Item>
              <Menu.Item name='work' active={activeItem === 'work'} onClick={this.handleItemClick}>
                  <Label>1</Label>
                  work
              </Menu.Item>
          </Menu>
      </div>
    );
  }
}

export default Select;