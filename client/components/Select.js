import React, {Component} from 'react';
import {Image, Item, Button, Grid, Menu, Segment, Input, Label} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import ReactDOM from "react-dom";

const avatarStyle = {
  width: '5vw',
  paddingLeft: '1em',
  paddingRight: '0.5em',
  marginLeft: '0em',
  marginRight: '1em'
}

const userName = ["friend1", "friend2", "friend3"];

class Select extends Component {

  constructor(props) {
    super(props);
    this.state = {activeIndex: 0}

    this.handleItemClick = this.handleItemClick.bind(this);

  }

  handleItemClick(e, {index}) {
    this.setState({activeIndex: index});
    this.props.handleMessages(userName[index]);
  }

  render() {
    const {activeIndex} = this.state;

    return (
      <div>
        <Menu vertical style={{marginTop: '5vh'}} pointing secondary vertical size='huge'>
          <Menu.Item>
            <Input icon='search' placeholder='Search tag...'/>
          </Menu.Item>
          <Menu.Item name='0' index={0} active={activeIndex === 0} onClick={this.handleItemClick}>
            <img style={avatarStyle} className="ui avatar image" src="../assets/avatar.jpg"/>
            Frank Qiao
            <Label color='red'>1</Label>
          </Menu.Item>
          <Menu.Item name='1' index={1} active={activeIndex === 1} onClick={this.handleItemClick}>
            <img style={avatarStyle} className="ui avatar image" src="../assets/avatar.jpg"/>
            Jack Wang
            <Label color='red'>12</Label>
          </Menu.Item>

          <Menu.Item name='2' index={2} active={activeIndex === 2} onClick={this.handleItemClick}>
            <img style={avatarStyle} className="ui avatar image" src="../assets/avatar.jpg"/>
            John Snow
            <Label color='red'>1</Label>
          </Menu.Item>

        </Menu>
      </div>
    );
  }
}

export default Select;