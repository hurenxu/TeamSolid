import React, {Component} from 'react';
import {Grid, Ref} from 'semantic-ui-react'
import MediaQuery from 'react-responsive';
import axios from 'axios';
import {Container, Form, Icon, Button, Header, Image, Modal, Input, Card, Divider, Segment} from 'semantic-ui-react'

const style = {
  marginTop: '2em',
  marginLeft: '2em',
  marginRight: '2em'
}

class FriendManagement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      targetFriend: "",
      value: "",
      username: "",
      pendingList: [],
      friendList: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.loadRequests = this.loadRequests.bind(this);
  }

  loadRequests() {
    console.log("Loading...")
    axios.post('api/getPendingList').then((response) => {
      this.setState({pendingList: JSON.parse(response.data)});
      console.log(this.state.pendingList)
    });
    axios.post('api/getFriendList').then((response) => {
      this.setState({friendList: JSON.parse(response.data)});
      console.log(this.state.friendList)
    });
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.loadRequests(),
      3000
    );
    axios.post('/api/getUserEmail').then((response) => {
      console.log(JSON.parse(response.data))
      this.setState({
        username: JSON.parse(response.data).username
      })
      axios.post('api/getFriendList').then((response) => {
        this.setState({friendList: JSON.parse(response.data)});
        console.log(this.state.friendList)
      });
      axios.post('api/getPendingList').then((response) => {
        this.setState({pendingList: JSON.parse(response.data)});
        console.log(this.state.pendingList)
      });
    });
  }


  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      targetFriend: event.target.value
    });
  }

  handleDelete(curr_friend, e) {
    e.preventDefault();
    axios.post('/api/updateFriendList', {tid: curr_friend, actionType: "delete"}).then((response) => {
      console.log(JSON.stringify(response.data));
      this.setState({friendList: JSON.parse(response.data)})
    });
  }

  handleApprove(curr_friend, e) {
    e.preventDefault();
    axios.post('api/getPendingList').then((response) => {
      this.setState({pendingList: JSON.parse(response.data)});
    });
    axios.post('/api/updateFriendList', {tid: curr_friend, actionType: "add"}).then((response) => {
      this.setState({friendList: JSON.parse(response.data)})
    });
  }

  handleSubmit(event) {
    console.log("Submit");
    console.log(this.state.targetFriend)
    if (this.state.friendList.includes(this.state.targetFriend)) {
      alert('He/she is already your friend!')
    }
    else {
      axios.post('/api/searchUser', {searchKey: this.state.targetFriend}).then((response) => {
        const checkResult = response.data;
        if (checkResult) {
          console.log("It exists")
          if (this.state.targetFriend === this.state.username) {
            alert('You cannot add yourself!')
          }
          else {
            axios.post('/api/addPendingList', {tid: this.state.targetFriend}).then((response) => {
              console.log(JSON.stringify(response.data));
              alert('Your request is sent');
              this.setState({value: ""});
            });
          }
        }
        else {
          console.log("It doesn't exist")
          alert('User doesn\'t exist!');
          this.setState({value: ""});
        }
      });
    }
  }

  render() {

    var pendingFriends = <div></div>
    var currFriends = <div></div>

    if (this.state.friendList.length != 0) {
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
    else {
      currFriends = <h3>You have no friends. Peter is always your friend.</h3>
    }

    if (this.state.pendingList.length != 0) {
      console.log("You have friends")
      console.log(this.state.friendList.length)
      pendingFriends = this.state.pendingList.map((friend) => (
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
                <Button basic color='green' onClick={this.handleApprove.bind(this, friend)}>
                  Approve
                </Button>
              </div>
            </Card.Content>
          </Card>
        )
      );
    }
    else {
      pendingFriends = <h3>You have no pending requests.</h3>
    }

    return (
      <div style={style}>
        <MediaQuery query="(max-device-width: 1224px)">
          <Header as='h3' textAlign='left'>Add a friend</Header>
          <Input icon='users' iconPosition='left' value={this.state.value}
                 onChange={this.handleChange} placeholder='Search users...'/>
          <Button icon labelPosition='right' onClick={this.handleSubmit}
                  style={{marginTop: '3em', marginBottom: '3em'}}>
            Add Friend
            <Icon name='right arrow'/>
          </Button>
          <Divider section/>
          <Header as='h3' textAlign='left'>Pending Requests</Header>
          <Card.Group style={{marginTop: '1em', marginBottom: '1em'}} itemsPerRow={1}>
            {pendingFriends}
          </Card.Group>
          <Divider section/>
          <Header as='h3' textAlign='left'>Manage friends</Header>
          <Card.Group style={{marginTop: '1em', marginBottom: '1em'}} itemsPerRow={1}>
            {currFriends}
          </Card.Group>
        </MediaQuery>
        <MediaQuery query="(min-device-width: 1224px)">
          <Header as='h2' textAlign='left'>Add a friend</Header>
          <Input icon='users' iconPosition='left' value={this.state.value}
                 onChange={this.handleChange} placeholder='Search users...'/>
          <Button icon labelPosition='right' onClick={this.handleSubmit}
                  style={{marginTop: '3em', marginBottom: '3em'}}>
            Add Friend
            <Icon name='right arrow'/>
          </Button>
          <Divider section/>
          <Grid style={{marginTop: '3em'}}>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as='h2' textAlign='left'>Pending Requests</Header>
                <Card.Group style={{marginTop: '1em', marginBottom: '1em'}} itemsPerRow={2}>
                  {pendingFriends}
                </Card.Group>
              </Grid.Column>
              <Grid.Column>
                <Header as='h2' textAlign='left'>Manage friends</Header>
                <Card.Group style={{marginTop: '1em', marginBottom: '1em'}} itemsPerRow={2}>
                  {currFriends}
                </Card.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </MediaQuery>
      </div>
    );
  }
}

export default FriendManagement