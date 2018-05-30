import React, {Component} from 'react';
import {Grid, Ref} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import axios from 'axios';
import {Container, Form, Icon, Button, Header, Image, Modal, Input} from 'semantic-ui-react'

const style = {
  marginTop: '5em',
}

class FriendManagement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      targetFriend: "",
      value: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
        axios.post('/api/updateFriendList', {email: "8888@8888.com", tid: this.state.targetFriend, actionType: "add"}).then((response) => {
          console.log(JSON.stringify(response.data));
          alert('Success');
          this.setState({value: ""});
        });
      }
      else{
        console.log("It doesn't exist")

        alert('User doesn\'t exist!');
        this.setState({value: ""});
      }
    });
  }

  render(){

    return (
      <div style={style}>
        <Input icon='users' iconPosition='left' value={this.state.value}
               onChange={this.handleChange} placeholder='Search users...' />
        <Button icon labelPosition='right' onClick={this.handleSubmit}>
          Add Friend
          <Icon name='right arrow' />
        </Button>
      </div>
    );
  }
}

export default FriendManagement