import React, {Component} from 'react';
import {Image, Item, Button, Grid, Menu, Segment, Input, Label, Header, Icon} from 'semantic-ui-react'
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
      console.log("Load friend list")

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
        <Menu.Item name={this.state.friendList[i].username} index={i} active={activeIndex == i}
                   onClick={this.handleItemClick}>
          <img style={avatarStyle} className="ui avatar image" src="../assets/avatar.jpg"/>
          {this.state.friendList[i].username}
          <Label color='red'>1</Label>
        </Menu.Item>
      )
    }

    return (
      <div>
        <Header as='h2' style={{marginLeft: "1em", marginTop: "1.2em", marginBottom: "1.5em"}}>
          <Icon name='users'/>
          <Header.Content>
            Friends
          </Header.Content>
        </Header>
        <Menu vertical style={{marginTop: '5vh'}} pointing secondary vertical size='huge'>
          {menuItems}
        </Menu>
      </div>
    );
  }
}

export default Select;