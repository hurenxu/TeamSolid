import React, {Component} from 'react';
import {Image, Item, Button, Grid, Menu, Segment, Input, Label} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import ReactDOM from "react-dom";
import axios from "axios";

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
      friendList: []
    }

    this.handleItemClick = this.handleItemClick.bind(this);

    // load friend list
    this.loadFriendList = this.loadFriendList.bind(this);
    this.loadFriendList();
  }

  handleItemClick(e, {index}) {
    this.setState({activeIndex: index});
    this.props.handleMessages(this.state.friendList[index].sid);
  }

  loadFriendList() {
    axios.post('/api/getFriendList').then((response) => {
      // this.setState({
      //   friendList: JSON.parse(response.data)
      // });

      const friendIDs = JSON.parse(response.data)

      axios.all(friendIDs.map(friendID => axios.post('/api/searchUser', {searchKey: friendID})))
        .then(axios.spread((...results) => {
          // all requests are now complete
          const friendDetails = results.map(res => JSON.parse(res.data))
          this.setState({
            friendList: friendDetails
          })
        }));
    })
  }

  render() {
    const {activeIndex} = this.state;
    var menuItems = []
    for (var i = 0; i < this.state.friendList.length; i++) {
      menuItems.push(
        <Menu.Item name={this.state.friendList[i].username} index={i} active={activeIndex == i} onClick={this.handleItemClick}>
          <img style={avatarStyle} className="ui avatar image" src="../assets/avatar.jpg"/>
          {this.state.friendList[i].username}
          <Label color='red'>1</Label>
        </Menu.Item>
      )
    }

    return (
      <div>
        <Menu vertical style={{marginTop: '5vh'}} pointing secondary vertical size='huge'>
          {/*<Menu.Item>*/}
            {/*<Input icon='search' placeholder='Search tag...'/>*/}
          {/*</Menu.Item>*/}
          {/*<Menu.Item name='0' index={0} active={activeIndex === 0} onClick={this.handleItemClick}>*/}
            {/*<img style={avatarStyle} className="ui avatar image" src="../assets/avatar.jpg"/>*/}
            {/*Frank Qiao*/}
            {/*<Label color='red'>1</Label>*/}
          {/*</Menu.Item>*/}
          {/*<Menu.Item name='1' index={1} active={activeIndex === 1} onClick={this.handleItemClick}>*/}
            {/*<img style={avatarStyle} className="ui avatar image" src="../assets/avatar.jpg"/>*/}
            {/*Jack Wang*/}
            {/*<Label color='red'>12</Label>*/}
          {/*</Menu.Item>*/}

          {/*<Menu.Item name='2' index={2} active={activeIndex === 2} onClick={this.handleItemClick}>*/}
            {/*<img style={avatarStyle} className="ui avatar image" src="../assets/avatar.jpg"/>*/}
            {/*John Snow*/}
            {/*<Label color='red'>1</Label>*/}
          {/*</Menu.Item>*/}

          {menuItems}
        </Menu>
      </div>
    );
  }
}

export default Select;