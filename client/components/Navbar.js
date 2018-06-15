import React, {Component} from 'react';
import {Button, Grid, Menu, Segment, Input, Label, Image, Sidebar, Icon, Header } from 'semantic-ui-react'
import MediaQuery from 'react-responsive';
import ReactDOM from "react-dom";
import '../css/App.css';
import axios from "axios/index";
import TechnicalSupport from "./TechnicalSupport"

const avatarStyle = {
  width: '21.3vw',
  paddingLeft: '6em',
  paddingRight: '6em',
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        activeItem: 'posts',
        username: 'Profile',
        openSupport: 0,
        subMsg: "Not Subscribed",
        visible: false,
         userImgURL:""
      };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.loadUsername = this.loadUsername.bind(this);

    this.loadUsername()
  }

  handleItemClick(e, {name}) {
    this.setState({activeItem: name})

    if (name === 'posts') {
      this.props.handlePosts();
    }
    else if (name === 'messages') {
      this.props.handleMessages();
    }
    else if (name === 'friends'){
      this.props.handleFriends();
    }
    else if (name === 'support'){
      this.setState({openSupport:1});
    }
    else if(name === "logout"){
        axios.post('/api/logout').then((response) => {
            window.location.reload();
        });
    }
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  loadUsername() {
    axios.post('/api/getUserName').then((response) => {
        this.setState({
            username: JSON.parse(response.data).username
        });
    })
    axios.post('/api/getUserIconUrl').then((response) => {
        var url = JSON.parse(response.data).userIconUrl;
        if (url[0] === undefined) {
            this.setState({
                userImgURL: "../assets/avatar.jpg"
            });
        }
        else {
            this.setState({
                userImgURL: ("/resource/" + url[0].filename)
            });
        }
    })
  }

  render() {
    this.state.subMsg = (this.props.sub === true) ? "Subscribed" : "Not Subscribed";
    const { visible } = this.state.visible
    return (
      <div>
        <MediaQuery query="(max-device-width: 1224px)">
          <Menu pointing size='small'>
            <Menu.Item name='me' onClick={this.handleItemClick}>
                <Image size='mini' circular src="../assets/avatar.jpg" />
            </Menu.Item>
            <Menu.Item name='posts' active={this.state.activeItem === 'posts'} onClick={this.handleItemClick}/>
            <Menu.Item name='messages' active={this.state.activeItem === 'messages'} onClick={this.handleItemClick}/>
            <Menu.Item name='friends' active={this.state.activeItem === 'friends'} onClick={this.handleItemClick}/>
            <Menu.Menu position='right'>
              <Menu.Item name='logout' onClick={this.handleItemClick}/>
            </Menu.Menu>
          </Menu>
        </MediaQuery>
        <MediaQuery query="(min-device-width: 1224px)">
          <Menu pointing size='huge'>
            <Menu.Item name='me' onClick={this.handleItemClick}>
              <Image size='mini' circular src={this.state.userImgURL} />
              <Label as='a' color='blue' onClick={this.props.handleUnsub}>
                {this.state.username}
                <Label.Detail>{this.state.subMsg}</Label.Detail>
              </Label>
            </Menu.Item>
            <Menu.Item name='posts' active={this.state.activeItem === 'posts'} onClick={this.handleItemClick}/>
            <Menu.Item name='messages' active={this.state.activeItem === 'messages'} onClick={this.handleItemClick}/>
            <Menu.Item name='friends' active={this.state.activeItem === 'friends'} onClick={this.handleItemClick}/>
            <Menu.Menu position='right'>
              <Menu.Item name='support' active={this.state.activeItem === 'support'} onClick={this.handleItemClick}/>
              <Menu.Item name='logout' onClick={this.handleItemClick}/>
            </Menu.Menu>
          </Menu>
        </MediaQuery>
        <TechnicalSupport open={this.state.openSupport === 1} onClose={()=> this.setState({openSupport: 0})}/>
      </div>
    );
  }
}

export default Navbar;