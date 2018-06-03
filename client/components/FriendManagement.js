import React, {Component} from 'react';
import {Grid, Ref} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import axios from 'axios';
import {Container, Form, Icon, Button, Header, Image, Modal, Input, Card} from 'semantic-ui-react'

const style = {
  marginTop: '5em',
}

class FriendManagement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      targetFriend: "",
      value: "",
      username: "",
      friendList: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

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

  handleChange(event) {
    this.setState({value: event.target.value,
                   targetFriend: event.target.value
    });
  }

  handleSubmit(event) {
    console.log("Submit");
    console.log(this.state.targetFriend)
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

  render(){

    console.log(this.state.friendList)

    var currFriends = <div></div>

    if(this.state.friendList){
      currFriends = this.state.friendList.map((friend) =>
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
              <Button basic color='red'>
                Delete
              </Button>
            </div>
          </Card.Content>
        </Card>
      );
    }

    return (
      <div style={style}>
        <Input icon='users' iconPosition='left' value={this.state.value}
               onChange={this.handleChange} placeholder='Search users...' />
        <Button icon labelPosition='right' onClick={this.handleSubmit}>
          Add Friend
          <Icon name='right arrow' />
        </Button>
        <Card.Group style={{marginTop: '3em'}}>
          {currFriends}
        </Card.Group>
      </div>
    );
  }
}

export default FriendManagement