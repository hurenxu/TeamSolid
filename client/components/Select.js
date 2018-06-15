import React, {Component} from 'react';
import {Image, Item, Button, Grid, Menu, Segment, Input, Label, Header, Icon, Divider} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import ReactDOM from "react-dom";
import axios from "axios";
import MediaQuery from 'react-responsive';


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
        <div>
          <MediaQuery query="(max-device-width: 1224px)">
            <Menu.Item name={this.state.friendList[i].username} index={i} active={true}
                       onClick={this.handleItemClick} style={{marginBottom: '1em'}}>
              <Grid verticalAlign='middle' centered>
                <Grid.Column width={3}>
                  <Image size='mini' circular src="../assets/avatar.jpg" />
                </Grid.Column>
                <Grid.Column textAlign="center" width={9}>
                  {this.state.friendList[i].username}
                </Grid.Column>
                <Grid.Column width={2}>
                  <Label color='red'>1</Label>
                </Grid.Column>
              </Grid>
            </Menu.Item>
          </MediaQuery>
          <MediaQuery query="(min-device-width: 1224px)">
            <Menu.Item name={this.state.friendList[i].username} index={i} active={activeIndex == i}
                       onClick={this.handleItemClick}>
              <Grid verticalAlign='middle' centered>
                <Grid.Column width={3}>
                  <Image size='mini' circular src="../assets/avatar.jpg" />
                </Grid.Column>
                <Grid.Column textAlign="center" width={9}>
                  {this.state.friendList[i].username}
                </Grid.Column>
                <Grid.Column width={2}>
                  <Label color='red'>1</Label>
                </Grid.Column>
              </Grid>
            </Menu.Item>
          </MediaQuery>
        </div>
      )
    }

    return (
      <div>
        <Header as='h2' style={{marginLeft: "1em", marginTop: "0.8em", marginBottom: "1.5em"}}>
          <Icon name='users'/>
          <Header.Content>
            Friends
          </Header.Content>
        </Header>
        <MediaQuery query="(max-device-width: 1224px)">
          <Menu vertical style={{marginLeft: '13vw'}} secondary vertical size='huge'>
            {menuItems}
          </Menu>
        </MediaQuery>
        <MediaQuery query="(min-device-width: 1224px)">
          <Menu vertical style={{marginTop: '5vh'}} pointing secondary vertical size='huge'>
            {menuItems}
          </Menu>
        </MediaQuery>
      </div>
    );
  }
}

export default Select;