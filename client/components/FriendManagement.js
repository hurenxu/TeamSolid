import React, {Component} from 'react';
import {Grid, Ref} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import axios from 'axios';
import { Container, Form, Popup, Button, Header, Image, Modal } from 'semantic-ui-react'

class FriendManagement extends Component {
  render(){
    return (
      <div>
        <Input icon='users' iconPosition='left' placeholder='Search users...' />
        <Button icon labelPosition='right'>
          Next
          <Icon name='right arrow' />
        </Button>
      </div>
    );
  }
}

export default FriendManagement