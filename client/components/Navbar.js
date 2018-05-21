import React, {Component} from 'react';
import {Button, Grid, Menu,} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import ReactDOM from "react-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        activeItem: 'post',
      };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    <div>
      <Menu pointing>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />
        <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick} />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <Segment>
        <img src='/assets/images/wireframe/paragraph.png' />
      </Segment>
    </div>
  }
}