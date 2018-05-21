import React, {Component} from 'react';
import {Button, Grid, Menu, Segment, Input} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import ReactDOM from "react-dom";

const styles = {
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        activeItem: 'post',
      };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    return (
      <div style={styles}>
        <Menu pointing size='huge'>
          <Menu.Item style={{marginLeft: '25vw'}} name='posts' active={this.state.activeItem === 'posts'} onClick={this.handleItemClick} />
          <Menu.Item name='messages' active={this.state.activeItem === 'messages'} onClick={this.handleItemClick} />
          <Menu.Item name='friends' active={this.state.activeItem === 'friends'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item name='logout' active={this.state.activeItem === 'logout'} onClick={this.handleItemClick} />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default Navbar;