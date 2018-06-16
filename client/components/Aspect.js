import React, {Component} from 'react';
import {Image, Item, Button, Grid, Menu, Segment, Input, Label, Header, Icon} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import ReactDOM from "react-dom";

const avatarStyle = {
  width: '5vw',
  paddingLeft: '1em',
  paddingRight: '0.5em',
  marginLeft: '0em',
  marginRight: '1em'
}

class Select extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      aspect: 'Others'
    }

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleAspect = this.handleAspect.bind(this);
  }

  handleItemClick(e, {index}) {
    this.setState({activeIndex: index});
  }

  handleAspect(aspect) {
    this.setState({aspect: aspect});
    this.props.handleAspect(aspect);
  }

  render() {
    const {activeIndex} = this.state;

    return (
      <div>
        <Header as='h2' style={{marginLeft: "1em", marginTop: "1.2em", marginBottom: "1.5em"}}>
          <Icon name='list layout'/>
          <Header.Content>
            Aspects
          </Header.Content>
        </Header>
        <Menu vertical style={{marginTop: '5vh'}} pointing secondary vertical size='huge'>
          <Menu.Item>
            <Input icon='search' placeholder='Search tag...'/>
          </Menu.Item>
          <Menu.Item name='0' index={0} value='Others' active={activeIndex === 0} onClick={(e, {value}) => {
            this.handleAspect(value);
            this.handleItemClick
          }}>
            Others
            <Label color='green'>1</Label>
          </Menu.Item>
          <Menu.Item name='0' index={1} value='Family' active={activeIndex === 1} onClick={(e, {value}) => {
            this.handleAspect(value);
            this.handleItemClick
          }}>
            Family
            <Label color='green'>1</Label>
          </Menu.Item>
          <Menu.Item name='1' index={2} value='Friends' active={activeIndex === 2} onClick={(e, {value}) => {
            this.handleAspect(value);
            this.handleItemClick
          }}>
            Friends
            <Label color='green'>12</Label>
          </Menu.Item>

          <Menu.Item name='2' index={3} value='Favorite' active={activeIndex === 3} onClick={(e, {value}) => {
            this.handleAspect(value);
            this.handleItemClick
          }}>
            Favorite
            <Label color='green'>1</Label>
          </Menu.Item>

        </Menu>
      </div>
    );
  }
}

export default Select;