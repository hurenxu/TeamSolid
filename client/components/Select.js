import React, {Component} from 'react';
import {Image, Item, Button, Grid, Menu, Segment, Input, Label, Header, Icon} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import ReactDOM from "react-dom";
import axios from "axios";

/**
 * The avatarStyle uses CSS attributes to format social media app avatars
 * @type {{width: string, paddingLeft: string, paddingRight: string, marginLeft: string, marginRight: string}}
 */
const avatarStyle = {
  width: '5vw',
  paddingLeft: '1em',
  paddingRight: '0.5em',
  marginLeft: '0em',
  marginRight: '1em'
}

/**
 * The Select class is meant to accomplish functionality that will allow the user to select components in the
 * social media web application.
 * @extends {Component}
 */
class Select extends Component {

    /**
     * The constructor passes a props object which is a react component that can be modified for use.
     * @param {Object} props=react_component - a react component that can be modified
     */
  constructor(props) {
    super(props);

        /**
         * State is susceptible to change and variability for react components.
         * @type {{activeIndex: number, friendList: Array}}
         */
    this.state = {
      activeIndex: 0,
      friendList: []
    }

    this.handleItemClick = this.handleItemClick.bind(this);

    // load friend list
    this.loadFriendList = this.loadFriendList.bind(this);
    this.loadFriendList();
  }

    /**
     * The handleItemClick method is meant to fire when a component is clicked on
     * @param {Object} e=react_event - modifies the state of the react element
     * @param index
     * @type {Method}
     */
  handleItemClick(e, {index}) {
    this.setState({activeIndex: index});
    this.props.handleMessages(this.state.friendList[index].sid);
  }

    /**
     * The loadFriendList method is meant configure and load the list of a user's friends
     * @type {Method}
     */
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

    /**
     * The render method invokes the formatted friend list loaded so that the user can select components.
     * @returns {*} - invokes formatted friend list
     */
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
        <Grid>
          <Grid.Row >
            <Header as='h2' floated='left'  style={{marginLeft: "1em"}}>
              <Icon name='users' />
              <Header.Content>
                Friends
              </Header.Content>
            </Header>
          </Grid.Row>
          <Grid.Row>
            <Menu vertical style={{marginTop: '5vh'}} pointing secondary vertical size='huge'>
              {menuItems}
            </Menu>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Select;