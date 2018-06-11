import React, {Component} from 'react';
import {Grid, Ref} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import axios from 'axios';
import {Container, Form, Icon, Button, Header, Image, Modal, Input, Card} from 'semantic-ui-react'

/**
 * The style uses CSS attributes for formatting purposes.
 * @type {{marginTop: string}}
 */
const style = {
  marginTop: '5em',
}

/**
 * The FriendMangement class is meant to accomplish functionality that will allow the user the autonamy to manage
 * their friends.
 * @extends {Component}
 */
class FriendManagement extends Component {

    /**
     * The constructor passes a props object which is a react component that can be modified for use.
     * @param {Object} props=react_component - a react component that can be modified
     */
  constructor(props) {
    super(props);

    /**
     * State is susceptible to change and variability for react components.
     * @type {{targetFriend: string, value: string, username: string, friendList: Object}}
     */
    this.state = {
      targetFriend: "",
      value: "",
      username: "",
      friendList: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  /**
   * The componentDidMount method is meant to verify if the component was able successfully get the user's email
   * and friend list.
   * @type {Method}
   */
  componentDidMount() {
    axios.post('/api/getUserEmail').then((response) => {
      console.log(JSON.parse(response.data))
      this.setState({
        username: JSON.parse(response.data).username
      })
      axios.post('api/getFriendList').then((response) => {
        this.setState({friendList: JSON.parse(response.data)});
      });
    });
  }

  /**
   * The handleChange method is meant to fire when the event of a react component changes.
   * @param {Object} event=react_event - modifies the state of the react element.
   * @type {Method}
   */
  handleChange(event) {
    this.setState({value: event.target.value,
                   targetFriend: event.target.value
    });
  }

  /**
   * The handleDelete method is meant to fire when a user attemps to delete a friend from their social media app.
   * @param {Object} curr_friend=friend_toBeDeleted - the friend that user attemps to delete.
   * @param {Object} e=react_event - modifies the state of the react element.
   * @type {Method}
   */
  handleDelete(curr_friend, e) {
    e.preventDefault();
    axios.post('/api/updateFriendList', {tid: curr_friend, actionType: "delete"}).then((response) => {
      console.log(JSON.stringify(response.data));
      this.setState({friendList: JSON.parse(response.data)})
    });
  }

  /**
   * The handleSubmit method is meant to fire when user makes a request by submitting an action.
   * @param {Object} event=react_event - modifies the state of the react element.
   * @type {Method}
   */
  handleSubmit(event) {
    console.log("Submit");
    console.log(this.state.targetFriend)
    if(this.state.friendList.includes(this.state.targetFriend)){
      alert('He/she is already your friend!')
    }
    else{
      axios.post('/api/searchUser', {searchKey: this.state.targetFriend}).then((response) => {
        const checkResult = response.data;
        if(checkResult){
          console.log("It exists")
          if(this.state.targetFriend === this.state.username){
            alert('You cannot add yourself!')
          }
          else{
            axios.post('/api/updateFriendList', {tid: this.state.targetFriend, actionType: "add"}).then((response) => {
              console.log(JSON.stringify(response.data));
              this.setState({friendList: JSON.parse(response.data)})
              alert('Success');
              this.setState({value: ""});
            });
          }
        }
        else{
          console.log("It doesn't exist")
          alert('User doesn\'t exist!');
          this.setState({value: ""});
        }
      });
    }
  }

  /**
   * The render method invokes the formatted list of friends and takes carer of modifications using the helper methods.
   * @returns {*} - invokes formatted list of friends with changes
   */
  render(){

    var currFriends = <div></div>

    if(this.state.friendList.length != 0){
      console.log("You have friends")
      console.log(this.state.friendList.length)
      currFriends = this.state.friendList.map((friend) => (
          <Card>
            <Card.Content>
              {/*<Image floated='right' size='mini' src='/assets/images/avatar/large/molly.png' />*/}
              <Card.Header>{friend}</Card.Header>
              <Card.Meta>Friend</Card.Meta>
              <Card.Description>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='red' onClick={this.handleDelete.bind(this, friend)}>
                  Delete
                </Button>
              </div>
            </Card.Content>
          </Card>
        )
      );
    }
    else{
      currFriends = <h3>You have no friends loser</h3>
      console.log("You have no friends")
    }

    return (
      <div style={style}>
        <Header as='h2' textAlign='left'>Add a friend</Header>
        <Input icon='users' iconPosition='left' value={this.state.value}
               onChange={this.handleChange} placeholder='Search users...' />
        <Button icon labelPosition='right' onClick={this.handleSubmit}>
          Add Friend
          <Icon name='right arrow' />
        </Button>
        <Header as='h2' textAlign='left'>Manage friends</Header>
        <Card.Group style={{marginTop: '3em'}}>
          {currFriends}
        </Card.Group>
      </div>
    );
  }
}

export default FriendManagement