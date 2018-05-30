import React, {Component} from 'react';
import {Grid, Ref} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import axios from 'axios';
import { Container, Form, Icon, Button, Header, Image, Modal, Input } from 'semantic-ui-react'

const style = {
  marginTop: '5em',
}

class FriendManagement extends Component {

  constructor(props){
    super(props);
    this.state = {
      targetFriend: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    console.log("Submit");
    console.log(this.state.targetFriend)
    axios.post('/api/updateFriendList', {email: "8888@8888.com", tid: this.state.targetFriend, actionType: "add"}).then((response) => {
      console.log(JSON.stringify(response))
    });
  }

  render(){
    return (
      <div style={style}>
        <Input icon='users' iconPosition='left' onChange={(e, {value})=> this.setState({targetFriend: value})} placeholder='Search users...' />
        <Button icon labelPosition='right' onClick={this.handleSubmit}>
          <Icon name='right arrow' />
        </Button>
      </div>
    );
  }
}

export default FriendManagement